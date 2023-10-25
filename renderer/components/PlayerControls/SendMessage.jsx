/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         Send messages to the chatbox in VRChat
 *  fileName:     /renderer/components/PlayerControls/Index.jsx
 */

import React, { useState } from "react";
import { sendMessage } from "../../utils/ipc";
import { useResponseCallback } from "../../hooks/useResponseCallback";

function SendMessage({ messageHistory, setMessageHistory }) {
  const [messageInput, setMessageInput] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //Have the send button turn green when it is clicked or enter is pressed
  const [sendBtnActive, setSendBtnActive] = useState(false);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.repeat) return;
    if (e.key === "Enter") {
      handleSend();
      setSendBtnActive(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      setSendBtnActive(false);
    }
  };

  const handleSend = async () => {
    if (messageInput.trim().length > 0) {
      sendMessage(messageInput);
    } else {
      setErrorMessage("Message cannot be empty.");
      setSuccessMessage(null);
    }
  };

  useResponseCallback(
    messageInput,
    setMessageInput,
    setMessageHistory,
    setSuccessMessage,
    setErrorMessage
  );

  return (
    <React.Fragment>
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
          onKeyDown={handleKeyPress}
          onKeyUp={handleKeyUp}
          className="w-full font-bold py-2 px-2"
          placeholder="Type Message Here"
        />
        <div className="mt-5">
          <button
            className={`focus:shadow-outline rounded  px-4 py-2 font-bold text-white  focus:outline-none ${
              sendBtnActive ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
            }`}
            type="button"
            onClick={handleSend}
            onMouseDown={() => {
              handleSend;
              setSendBtnActive(true);
            }}
            onMouseUp={() => {
              setSendBtnActive(false);
            }}
          >
            Send
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </form>
    </React.Fragment>
  );
}

export default SendMessage;
