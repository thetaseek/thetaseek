import castArray from "lodash/castArray";
import isArray from "lodash/isArray";
import ReconnectingWebsocket from "./reconnecting-websocket";
import {manageSession, transformReply} from "./deribit-utils";

const socket = new ReconnectingWebsocket(
  // "wss://www.deribit.com/ws/api/v2",
  "wss://test.deribit.com/ws/api/v2",
  null,
  {
    automaticOpen: false,
  }
);

manageSession(socket, socket.refresh);

// Manage subscriptions

// Key is the channel, value is function handler
const subscriptions = {};
socket.addEventListener("open", (event) => {
  socket.send(
    JSON.stringify({
      method: "public/subscribe",
      params: {
        channels: Object.keys(subscriptions),
      },
      jsonrpc: "2.0",
      id: Date.now(),
    })
  );
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "subscription") {
    const {channel, data} = message.params;
    if (subscriptions[channel]) {
      subscriptions[channel](transformReply(data));
    } else {
      console.log("Ignoring subscription: ", channel);
    }
  }
});

export const subscriptionAdd = (channelArg, handler) => {
  const channels = castArray(channelArg);
  channels.forEach((channel, i) => {
    subscriptions[channel] = isArray(handler) ? handler[i] : handler;
  });

  socket.send(
    JSON.stringify({
      method: "public/subscribe",
      params: {
        channels,
      },
      jsonrpc: "2.0",
      id: Date.now(),
    })
  );
};

export const subscriptionRemove = (channelArg) => {
  const channels = castArray(channelArg);
  channels.forEach((channel) => {
    delete channels[channel];
  });

  socket.send(
    JSON.stringify({
      method: "public/unsubscribe",
      params: {
        channels,
      },
      jsonrpc: "2.0",
      id: Date.now(),
    })
  );
};

// Function to make a rpc call over ws. Will resolve with response
export const call = (request, {timeout = 10000} = {}) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(reject, timeout, new Error("Call timed out"));

    const id = Date.now();
    const payload = JSON.stringify({
      method: request.method,
      params: request.params,
      jsonrpc: "2.0",
      id,
    });

    function callback(event) {
      const message = JSON.parse(event.data);
      if (message.id === id) {
        socket.removeEventListener("message", callback);
        clearTimeout(timer);
        return resolve(message);
      }
    }

    // If connection is open send, otherwise wait for connection to open;
    if (socket.readyState === 1) {
      socket.send(payload);
    } else {
      // Connection opened
      socket.addEventListener("open", () => socket.send(payload), {
        once: true,
      });
    }

    socket.addEventListener("message", callback);
  });

export default socket;
