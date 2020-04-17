import React from "react";
import "./App.css";
import {Websocket} from "./components/Websocket";
import {OptionsTable} from "./components/OptionsTable";
import {OptionsSelector} from "./components/OptionsSelector";
import {MarkPrice} from "./components/MarkPrice";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Websocket/>
        {/*<MarkPrice/>*/}
        {/*<OptionsTable/>*/}
        <OptionsSelector/>
      </header>
    </div>
  );
}

export default App;
