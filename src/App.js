import React from "react";
import "./App.css";
import {Websocket} from "./components/Websocket";
import {OptionsTable} from "./components/OptionsTable";
import OptionsSelector from "./components/OptionsSelector";
import {MarkPrice} from "./components/MarkPrice";
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from "./store/instruments";
import {subscriptionAdd, subscriptionRemove} from "./services/deribit";
import {actions as tickers} from "./store/tickers";

function App() {
  const dispatch = useDispatch();
  const instruments = useSelector(selectors.options);

  React.useEffect(() => {
    dispatch(actions.request());
  }, [dispatch]);


  React.useEffect(() => {
    if (instruments.length > 0) {
      console.log("Subscribing to instruments");
      const channels = instruments.map(
        (x) => `ticker.${x.instrumentName}.100ms`
      );
      subscriptionAdd(channels, (d) => dispatch(tickers.update(d)));
      return () => subscriptionRemove(channels);
    }
    return () => {
    };
  }, [dispatch, instruments]);

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
