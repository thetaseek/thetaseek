import React from "react";
import {connect} from "react-redux";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export class MinMaxFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: "",
      max: "",
    };
  }

  valueChanged = (event) => {
    const that = this;
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.props.parentFilterInstance(function (instance) {
          const {min, max} = that.state;
          if (min && max) {
            return instance.setModel({
              filterType: "number",
              type: "inRange",
              filter: min,
              filterTo: max,
            });
          }
          if (min) {
            return instance.setModel({
              filterType: "number",
              type: "greaterThanOrEqual",
              filter: min,
            });
          }
          if (max) {
            return instance.setModel({
              filterType: "number",
              type: "lessThanOrEqual",
              filter: max,
            });
          }
          return instance.setModel(null)
        });
      }
    );
  };

  onParentModelChanged(parentModel) {
    switch (parentModel.type || null) {
      case "greaterThan":
      case "greaterThanOrEqual": {
        return this.setState({
          min: parentModel.filter,
        });
      }
      case "lessThan":
      case "lessThanOrEqual": {
        return this.setState({
          max: parentModel.filter,
        });
      }
      case "inRange": {
        return this.setState({
          min: parentModel.filter,
          max: parentModel.filterTo,
        });
      }
      default: {
        return this.setState({
          min: "",
          max: "",
        });
      }
    }
  }

  render() {
    const style = {
      width: "30%",
      margin: "0 2px",
      padding: "1px",
      display: "flex",
      alignItems: "center",
    };
    return (
      <>
        <div style={{height: "100%"}} className="ag-floating-filter-input">
          <input
            className="ag-input-field-input ag-text-field-input"
            style={style}
            type="number"
            value={this.state.min}
            name="min"
            placeholder="MIN"
            onChange={this.valueChanged}
          />
          <input
            className="ag-input-field-input ag-text-field-input"
            style={style}
            type="number"
            value={this.state.max}
            name="max"
            placeholder="MAX"
            onChange={this.valueChanged}
          />
        </div>
      </>
    );
  }
}

export function OptionsSelector({options}) {
  const columnDefs = [
    {
      headerName: "Instrument",
      field: "instrumentName",
      sortable: true,
      filter: true,
    },
    ...[
      {headerName: "Delta", field: "greeks.delta"},
      {headerName: "Gamma", field: "greeks.gamma"},
      {headerName: "Vega", field: "greeks.vega"},
      {headerName: "Theta", field: "greeks.theta"},
    ].map((x) =>
      Object.assign(x, {
        sortable: true,
        filter: "agNumberColumnFilter",
        floatingFilterComponent: "customNumberMinMaxFilter",
        filterParams: {
          debounceMs: 200,
        },
      })
    ),
  ];

  const rowData = Object.values(options);
  const onGridReady = (params) => {
    console.log("Grid Ready", params);
  };
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        width: "80vw",
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        floatingFilter
        columnDefs={columnDefs}
        rowData={rowData}
        // enable delta updates for redux
        deltaRowDataMode={true}
        getRowNodeId={(data) => data.instrumentName}
        frameworkComponents={{
          customNumberMinMaxFilter: MinMaxFilter,
        }}
      />
    </div>
  );
}

export default connect(
  (state) => {
    return {
      options: state.tickers.tickers,
    };
  },
  null,
  null,
  {forwardRef: true} // must be supplied for react/redux when using AgGridReact
)(OptionsSelector);
