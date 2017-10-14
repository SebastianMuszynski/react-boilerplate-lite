import * as React from "react";
const cls = require("./App.css");

interface AppStateType {
  text: string;
}

class App extends React.Component<{}, AppStateType> {
  state = {
    text: "Hello World!",
  };

  render() {
    return (
      <div>
        <h1 className={cls.title}>{this.state.text}</h1>
      </div>
    );
  }
}

export default App;
