import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="mainpagewrapper">
          <div id="backgroundImage">
            <div id="mainTitle">Receiply</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
