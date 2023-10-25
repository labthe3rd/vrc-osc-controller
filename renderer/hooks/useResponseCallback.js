/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         This file handles the response callback
 *  fileName:     /renderer/hooks/useKeyPress.js
 */
import { useEffect } from "react";
import { setResponseCallback } from "../utils/ipc";

export const useResponseCallback = (
  messageInput,
  setMessageInput,
  setMessageHistory,
  setSuccessMessage,
  setErrorMessage
) => {
  //Response callback for when message is sent and a response is received
  //Add the previous message to the history with a timestamp
  useEffect(() => {
    setResponseCallback((response) => {
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
};
