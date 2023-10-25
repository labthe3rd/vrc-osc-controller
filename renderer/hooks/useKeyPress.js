/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         This file handles the key press useEffect
 *  fileName:     /renderer/hooks/useKeyPress.js
 */
import { useEffect } from "react";
import { sendMoveCommand, sendRotationCommand } from "../utils/ipc";

export const useKeyPress = (setActiveKeys) => {
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
};
