import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "../store/websocket";

export function Websocket() {
  const isOpen = useSelector(selectors.isOpen);
  return <div>Connection Status: {isOpen ? "Open" : "Closed"}</div>;
}
