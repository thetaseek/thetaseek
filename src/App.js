import React from "react";
import "./App.css";
import {Websocket} from "./components/Websocket";
import {OptionsTable} from "./components/OptionsTable";
import {useDispatch} from "react-redux";
import socket from "./services/deribit";
import {actions} from "./store/websocket";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    socket.open();

    socket.addEventListener("open", () => {
      dispatch(actions.open());
      console.debug("Connection to Deribit opened");
    });

    socket.addEventListener(
      "close",
      () => {
        dispatch(actions.close());
        console.debug("Connection to Deribit closed");
      },
      {once: true}
    );

    return () => {
      console.log("Closing connection to Deribit");
      socket.close();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <Websocket/>
        <OptionsTable/>
      </header>
    </div>
  );
}

export default App;
