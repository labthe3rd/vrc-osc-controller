import React from "react";
import { sendMoveCommand } from "../../utils/ipc";

const StrafeButtonGroup = ({ activeKeys, setActiveKeys }) => {
  return (
    <React.Fragment>
      <div
        id="button-horizontal"
        className="mr-10 h-28 w-32 place-self-end md:mr-20"
      >
        <div className="text-center text-xs font-bold">Strafe</div>
        <div className="grid h-3/4 w-full grid-cols-3 grid-rows-2 gap-0">
          <button
            className={`focus:shadow-outline col-start-2 h-full w-full place-self-center rounded  font-bold text-white focus:outline-none ${
              activeKeys.W ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
              activeKeys.A ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
              activeKeys.S ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
              activeKeys.D ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
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
    </React.Fragment>
  );
};

export default StrafeButtonGroup;
