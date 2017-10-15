const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const cheerio = require("cheerio");

function render(req, res) {
  const context = {};

  const { default: App, flushSSRPortals } = require("../../build/app.server");

  const body = ReactDOMServer.renderToString(React.createElement(App));
  const template = fs.readFileSync(path.resolve("build/index.html"), "utf8");
  const html = template.replace("<div id=\"root\"></div>", `<div id="root">${body}</div>`);
  const $ = cheerio.load(html);

  flushSSRPortals()
    .map(([selector, children]) => [selector, ReactDOMServer.renderToStaticMarkup(children)])
    .forEach(([selector, markup]) => {
      $(selector).append(markup);
    });

  if (context.url) {
    res.redirect(context.status, context.url);
  } else {
    res.status(context.status || 200).send($.html());
  }
}

module.exports = render;
