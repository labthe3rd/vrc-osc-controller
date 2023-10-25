/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         Rotation Button Group for Player Controls
 *  fileName:     /components/PlayerControls/RotationButtonGroup.jsx
 */

import React from "react";
import { sendRotationCommand } from "../../utils/ipc";

const RotationButtonGroup = ({ activeKeys, setActiveKeys }) => {
  return (
    <React.Fragment>
      <div
        id="button-horizontal"
        className="ml-10 h-20 w-32 place-self-start md:ml-20"
      >
        <div className="text-center text-xs font-bold">Rotate</div>
        <div className="grid h-3/4 w-full grid-cols-2 gap-2">
          <button
            className={`box-border h-full w-full place-self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none ${
              activeKeys.Q ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
              activeKeys.E ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
    </React.Fragment>
  );
};

export default RotationButtonGroup;
