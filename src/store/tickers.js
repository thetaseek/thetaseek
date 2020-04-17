import pick from "lodash/pick";
import {createSlice} from "@reduxjs/toolkit";

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
const slice = createSlice({
  name: "tickers",
  initialState: {
    tickers: {},
  },
  reducers: {
    update: (state, {payload}) => {
      // Performance is to bad if i don't do this
      state.tickers[payload.instrumentName] = pick(payload, [
        "greeks.vega",
        "greeks.theta",
        "greeks.rho",
        "greeks.gamma",
        "greeks.delta",
        "bestBidPrice",
        "bestBidAmount",
        "bestAskPrice",
        "bestAskAmount",
        "instrumentName",
      ]);
    },
  },
});

export const actions = slice.actions;

export const tickerSelectorFactory = (ticker) => (state) =>
  state.tickers.tickers[ticker] || {};

export const selectors = {
  tickers: (state) => Object.values(state.tickers.tickers),
};

export default slice.reducer;
