import React, { Component } from "react";
import { createPortal } from "react-dom";

const portals = [];

function createSRRPortal(children, selector) {
  if (typeof window === "undefined") {
    portals.push([selector, children]);
    return null;
  }
  return createPortal(children, document.querySelector(selector));
}

export function flushSSRPortals() {
  const copy = [...portals];
  portals.length = 0;
  return copy;
}

const Head = ({ children }) => createSRRPortal(children, "head");

const Article = ({ title, description, children }) => (
  <article>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <h1>{title}</h1>
    {children}
  </article>
);

class App extends Component {
  state = {
    article: 0,
  };

  increment = () => {
    this.setState(({ article }) => ({ article: article + 1 }));
  };

  render() {
    if (this.state.article % 2) {
      return (
        <Article title="Hello, Portals!" description="Awesome">
          <p>Lorem ipsum!</p>
          <button onClick={this.increment}>Button</button>
        </Article>
      );
    }

    return (
      <Article title="Hello, World!" description="eh, ok">
        <p>Lorem ipsum?</p>
        <button onClick={this.increment}>Button</button>
      </Article>
    );
  }
}

export default App;
