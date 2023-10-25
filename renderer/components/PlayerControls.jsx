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

  //Prevent duplicate commands being sent

  //Active keys for color changing effect of buttons
  const [activeKeys, setActiveKeys] = useState({
    W: false,
    A: false,
    S: false,
    D: false,
    Q: false,
    E: false,
  });

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

  //Handle all key press scenarios for added control capabilities
  useEffect(() => {
    const handleKeydown = (event) => {
      //Prevent keyboard from repeating the keydown event
      if (event.repeat) return;
      // Check if the event target is the message input, and if so, exit early
      if (event.target.id === "message-text-box") {
        return;
      }
      switch (event.key) {
        case "W":
        case "w":
          sendMoveCommand("Vertical", 1);
          break;
        case "A":
        case "a":
          sendMoveCommand("Horizontal", -1);
          break;
        case "S":
        case "s":
          sendMoveCommand("Vertical", -1);
          break;
        case "D":
        case "d":
          sendMoveCommand("Horizontal", 1);
          break;
        case "Q":
        case "q":
          sendRotationCommand(-1);
          break;
        case "E":
        case "e":
          sendRotationCommand(1);
          break;
        default:
          // Handle other keys if necessary
          break;
      }

      //Set the variable to change the color of the button
      if (
        ["W", "w", "A", "a", "S", "s", "D", "d", "Q", "q", "E", "e"].includes(
          event.key
        )
      ) {
        setActiveKeys((prevKeys) => ({
          ...prevKeys,
          [event.key.toUpperCase()]: true,
        }));
      }
    };

    const handleKeyup = (event) => {
      // Check if the event target is the message input, and if so, exit early
      if (event.target.id === "message-text-box") {
        return;
      }
      switch (event.key) {
        case "W":
        case "w":
        case "S":
        case "s":
          sendMoveCommand("Vertical", 0);
          break;
        case "A":
        case "a":
        case "D":
        case "d":
          sendMoveCommand("Horizontal", 0);
          break;
        case "Q":
        case "q":
        case "E":
        case "e":
          sendRotationCommand(0);
          break;
        default:
          // Handle other keys if necessary
          break;
      }

      //Set the variable to change the color of the button
      if (
        ["W", "w", "A", "a", "S", "s", "D", "d", "Q", "q", "E", "e"].includes(
          event.key
        )
      ) {
        setActiveKeys((prevKeys) => ({
          ...prevKeys,
          [event.key.toUpperCase()]: false,
        }));
      }
    };

    window.addEventListener("keyup", handleKeyup);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      // Cleanup
      window.removeEventListener("keyup", handleKeyup);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

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
                className={`focus:shadow-outline col-start-2 h-full w-full place-self-center rounded  font-bold text-white focus:outline-none ${
                  activeKeys.W
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendMoveCommand("Vertical", 1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, W: true }));
                }}
                onMouseUp={() => {
                  sendMoveCommand("Vertical", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, W: false }));
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Vertical", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, W: false }));
                }}
              >
                W
              </button>
              <button
                className={`focus:shadow-outline col-start-1 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none ${
                  activeKeys.A
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendMoveCommand("Horizontal", -1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, A: true }));
                }}
                onMouseUp={() => {
                  sendMoveCommand("Horizontal", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, A: false }));
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Horizontal", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, A: false }));
                }}
              >
                A
              </button>
              <button
                className={`focus:shadow-outline col-start-2 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none ${
                  activeKeys.S
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendMoveCommand("Vertical", -1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, S: true }));
                }}
                onMouseUp={() => {
                  sendMoveCommand("Vertical", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, S: false }));
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Vertical", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, S: false }));
                }}
              >
                S
              </button>
              <button
                className={`focus:shadow-outline col-start-3 row-start-2 h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none ${
                  activeKeys.D
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendMoveCommand("Horizontal", 1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, D: true }));
                }}
                onMouseUp={() => {
                  sendMoveCommand("Horizontal", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, D: false }));
                }}
                onMouseLeave={() => {
                  sendMoveCommand("Horizontal", 0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, D: false }));
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
                className={`box-border h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none ${
                  activeKeys.Q
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendRotationCommand(-1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, L: true }));
                }}
                onMouseUp={() => {
                  sendRotationCommand(0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, L: false }));
                }}
                onMouseLeave={() => {
                  sendRotationCommand(0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, L: false }));
                }}
              >
                Q
              </button>
              <button
                className={`box-border h-full w-full place-self-center rounded font-bold text-white  focus:outline-none bg-blue-500 hover:bg-blue-700 ${
                  activeKeys.E
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onMouseDown={() => {
                  sendRotationCommand(1);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, R: true }));
                }}
                onMouseUp={() => {
                  sendRotationCommand(0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, R: false }));
                }}
                onMouseLeave={() => {
                  sendRotationCommand(0);
                  setActiveKeys((prevKeys) => ({ ...prevKeys, R: false }));
                }}
              >
                E
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
