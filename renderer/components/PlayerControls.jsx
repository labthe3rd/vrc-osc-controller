/*  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         React logic for OSC Controller logic
 */

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ConfigForm from "./ConfigForm";

export default function PlayerControls({ messageHistory, setMessageHistory }) {
  // useState hook for input value
  const [messageInput, setMessageInput] = useState("");

  // useState hooks for success and error messages
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //Response callback for when message is sent and a response is received
  //Add the previous message to the history with a timestamp
  useEffect(() => {
    window.ipc.setResponseCallback((response) => {
      console.log("Received in React:", response.status);

      if (response.status === "ok") {
        // Adding to message history with a date/time stamp
        const timestamp = new Date().toLocaleString();
        setMessageHistory((prevHistory) => [
          ...prevHistory,
          `${timestamp}: ${messageInput}`,
        ]);

        // Set success message
        setSuccessMessage("Message Sent!");
        setErrorMessage(null);

        // Clear the input field
        setMessageInput("");
      } else {
        // Set error message
        setErrorMessage("Something went wrong... please try again");
        setSuccessMessage(null);
      }
    });
  }, [messageInput]); // Depend on messageInput so the callback has the latest value

  // Handle input change
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  //When the enter key is pressed send the message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Send chatbox message to background.js
  const handleSend = async () => {
    if (messageInput.trim().length > 0) {
      window.ipc.sendMessage(messageInput);
    } else {
      // Optional: Add feedback to the user that the message can't be empty.
      setErrorMessage("Message cannot be empty.");
      setSuccessMessage(null);
    }
  };

  //Strafe movement
  function sendMoveCommand(direction, value) {
    window.ipc.sendMoveCommand(direction, value);
  }

  //Rotate the player
  function sendRotationCommand(value) {
    window.ipc.sendRotationCommand(value);
  }

  return (
    <React.Fragment>
      <div className="h-1/4 max-h-40 w-full bg-white shadow-md py-2">
        <h2 id="button-title" className="text-center text-xs font-bold">
          Movement Controller
        </h2>
        <div
          id="button-container"
          className="grid grid-cols-2 grid-rows-2 py-4"
        >
          {/* <!-- Strafe Button Group --> */}
          <div
            id="button-horizontal"
            className="mr-10 h-28 w-32 place-self-end md:mr-20"
          >
            <div className="text-center text-xs font-bold">Strafe</div>
            <div className="grid h-3/4 w-full grid-cols-3 grid-rows-2 gap-0">
              <button
                className="focus:shadow-outline col-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendMoveCommand("Vertical", 1);
                }}
                onMouseUp={() => {
                  sendMoveCommand("Vertical", 0);
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Vertical", 0);
                }}
              >
                W
              </button>
              <button
                className="focus:shadow-outline col-start-1 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendMoveCommand("Horizontal", -1);
                }}
                onMouseUp={() => {
                  sendMoveCommand("Horizontal", 0);
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Horizontal", 0);
                }}
              >
                A
              </button>
              <button
                className="focus:shadow-outline col-start-2 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendMoveCommand("Vertical", -1);
                }}
                onMouseUp={() => {
                  sendMoveCommand("Vertical", 0);
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Vertical", 0);
                }}
              >
                S
              </button>
              <button
                className="focus:shadow-outline col-start-3 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendMoveCommand("Horizontal", 1);
                }}
                onMouseUp={() => {
                  sendMoveCommand("Horizontal", 0);
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Horizontal", 0);
                }}
              >
                D
              </button>
            </div>
          </div>
          {/* <!-- Horizontal Button Group --> */}
          <div
            id="button-horizontal"
            className="ml-10 h-20 w-32 place-self-start md:ml-20"
          >
            <div className="text-center text-xs font-bold">Rotate</div>
            <div className="grid h-3/4 w-full grid-cols-2 gap-2">
              <button
                className="box-border h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendRotationCommand(-1);
                }}
                onMouseUp={() => {
                  sendRotationCommand(0);
                }}
                onMouseLeave={() => {
                  sendRotationCommand(0);
                }}
              >
                L
              </button>
              <button
                className="box-border h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onMouseDown={() => {
                  sendRotationCommand(1);
                }}
                onMouseUp={() => {
                  sendRotationCommand(0);
                }}
                onMouseLeave={() => {
                  sendRotationCommand(0);
                }}
              >
                R
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 id="button-title" className="text-center text-xs font-bold py-1">
          Send Message
        </h2>
        <input
          id="message-text-box"
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} //When the enter key is pressed send the message, like pressing the button
          className="w-full font-bold py-2 px-2"
          placeholder="Type Message Here"
        />
        <div className="mt-5">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
            onClick={handleSend}
          >
            Send
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </form>
      <h4 className="text-center text-xs font-bold">Messages History</h4>
      <textarea
        className="mb-4 h-1/3 w-full rounded bg-blue-500 pt-6 font-semibold text-white shadow-md"
        readOnly
        value={messageHistory.join("\n")}
      ></textarea>
    </React.Fragment>
  );
}
