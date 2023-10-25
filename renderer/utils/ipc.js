/*
 *  programmer:     labthe3rd
 *  date:           10/25/23
 *  desc:           Integrate IPC functions from React App to Electron
 *  fileName:       /renderer/utils/ipc.js
 */

// Define IPC-related functions here

export function setResponseCallback(callback) {
  window.ipc.setResponseCallback(callback);
}

export function sendMessage(message) {
  window.ipc.sendMessage(message);
}

export function sendMoveCommand(direction, value) {
  window.ipc.sendMoveCommand(direction, value);
}

export function sendRotationCommand(value) {
  window.ipc.sendRotationCommand(value);
}
