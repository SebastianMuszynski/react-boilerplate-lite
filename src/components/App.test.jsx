import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import App from "./App";

test("Contains text from state", () => {
  const tree = shallow(<App />);

  tree.setState({ text: "Foo!" });

  expect(tree.find(".title").contains("Foo!")).toBe(true);

  expect(toJson(tree)).toMatchSnapshot();
});
