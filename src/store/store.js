import {configureStore} from "@reduxjs/toolkit";
import instruments from "./instruments";
import tickers from "./tickers";
import websocket from "./websocket";

export default configureStore({
  reducer: {
    instruments,
    tickers,
    websocket,
  },
});
