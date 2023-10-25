/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         Combine the player controls components in this file
 *  fileName:     /renderer/components/PlayerControls/Index.jsx
 */

import React, { useState } from "react";
import StrafeButtonGroup from "./StrafeButtonGroup";
import RotationButtonGroup from "./RotationButtonGroup";
import SendMessage from "./SendMessage";
import { useKeyPress } from "../../hooks/useKeyPress";
import MessageHistory from "./MessageHistory";

export default function PlayerControls({ messageHistory, setMessageHistory }) {
  const [activeKeys, setActiveKeys] = useState({
    W: false,
    A: false,
    S: false,
    D: false,
    Q: false,
    E: false,
  });

  useKeyPress(setActiveKeys);

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
          <StrafeButtonGroup
            activeKeys={activeKeys}
            setActiveKeys={setActiveKeys}
          />
          <RotationButtonGroup
            activeKeys={activeKeys}
            setActiveKeys={setActiveKeys}
          />
        </div>
      </div>
      <SendMessage
        messageHistory={messageHistory}
        setMessageHistory={setMessageHistory}
      />
      <MessageHistory messageHistory={messageHistory} />
    </React.Fragment>
  );
}
