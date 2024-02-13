"use client";

import { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/socketProvider";
export default function page() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div>
      <h1> Page</h1>
      <div>
        <p>
          This is a page that is served by the web app. It is using the socket
          provider context to connect to the server.
        </p>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className={classes["chat-input"]}
          />
          <button
            onClick={(e) => sendMessage(message)}
            className={classes["button"]}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
