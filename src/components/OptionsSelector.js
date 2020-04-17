import "react-tabulator/lib/css/tabulator.min.css";
import "react-tabulator/lib/styles.css"; // required styles
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import map from "lodash/map";
import {ReactTabulator} from "react-tabulator";
import {useSelector, useDispatch} from "react-redux";
import {
  actions as tickers,
  selectors as tickerSelectors,
} from "../store/tickers";
import {actions, selectors} from "../store/instruments";
import {subscriptionAdd, subscriptionRemove} from "../services/deribit";

//custom max min header filter
var minMaxFilterEditor = function (
  cell,
  onRendered,
  success,
  cancel,
  editorParams
) {
  var end;

  var container = document.createElement("span");

  //create and style inputs
  var start = document.createElement("input");
  start.setAttribute("type", "number");
  start.setAttribute("placeholder", "Min");
  // start.setAttribute("min", 0);
  // start.setAttribute("max", 100);
  start.style.padding = "4px";
  start.style.width = "50%";
  start.style.boxSizing = "border-box";

  start.value = cell.getValue();

  function buildValues() {
    console.log({
      start: start.value,
      end: end.value,
    });
    success({
      start: start.value,
      end: end.value,
    });
  }

  function keypress(e) {
    if (e.keyCode == 13) {
      buildValues();
    }

    if (e.keyCode == 27) {
      cancel();
    }
  }

  end = start.cloneNode();
  end.setAttribute("placeholder", "Max");

  start.addEventListener("change", buildValues);
  start.addEventListener("input", buildValues);
  // start.addEventListener("blur", buildValues);
  start.addEventListener("keydown", keypress);

  end.addEventListener("change", buildValues);
  // end.addEventListener("blur", buildValues);
  end.addEventListener("keydown", keypress);

  container.appendChild(start);
  container.appendChild(end);

  return container;
};

//custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
  //headerValue - the value of the header filter element
  //rowValue - the value of the column in this row
  //rowData - the data for the row being filtered
  //filterParams - params object passed to the headerFilterFuncParams property

  if (rowValue) {
    if (headerValue.start !== "") {
      if (headerValue.end !== "") {
        return rowValue >= headerValue.start && rowValue <= headerValue.end;
      } else {
        return rowValue >= headerValue.start;
      }
    } else {
      if (headerValue.end !== "") {
        return rowValue <= headerValue.end;
      }
    }
  }

  return true; //must return a boolean, true if it passes the filter.
}

const columns = [
  {
    title: "Instrument",
    field: "instrumentName",
    headerFilter: "input",
  },
  {
    title: "Delta",
    field: "greeks.delta",
    // headerFilter: minMaxFilterEditor,
    // headerFilterFunc: (...args) => {
    //   const resp = minMaxFilterFunction(...args);
    //   console.log(resp);
    //   return resp;
    // },
    hozAlign: "right",
  },
  {
    title: "Gamma",
    field: "greeks.gamma",
    // headerFilter: minMaxFilterEditor,
    // headerFilterFunc: minMaxFilterFunction,
    hozAlign: "right",
  },
  {
    title: "Vega",
    field: "greeks.vega",
    // headerFilter: minMaxFilterEditor,
    // headerFilterFunc: minMaxFilterFunction,
    hozAlign: "right",
  },
  {
    title: "Theta",
    field: "greeks.theta",
    // headerFilter: minMaxFilterEditor,
    // headerFilterFunc: minMaxFilterFunction,
    hozAlign: "right",
  },
];

export function OptionsSelector() {
  const dispatch = useDispatch();
  const instruments = useSelector(selectors.options);

  React.useEffect(() => {
    dispatch(actions.request());
  }, [dispatch]);

  const options = useSelector(tickerSelectors.tickers);

  React.useEffect(() => {
    if (instruments.length > 0) {
      console.log("Subscribing to instruments");
      const channels = instruments.map((x) => `ticker.${x.instrumentName}.100ms`);
      subscriptionAdd(channels, (d) => dispatch(tickers.update(d)));
      return () => subscriptionRemove(channels);
    }
    return () => {
    };
  }, [dispatch, instruments]);


  return (
    <div>
      <ReactTabulator columns={columns} data={cloneDeep(options)}/>
    </div>
  );
}
