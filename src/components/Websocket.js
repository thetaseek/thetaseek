import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {actions, selectors} from "../store/websocket";
import socket from "../services/deribit";

export function Websocket() {
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
  const isOpen = useSelector(selectors.isOpen);
  return <div>Connection Status: {isOpen ? "Open" : "Closed"}</div>;
}
