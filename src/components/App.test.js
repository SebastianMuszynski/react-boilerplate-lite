import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("Contains text from state", () => {
  const tree = shallow(<App />);

  console.log(tree.debug());
});
