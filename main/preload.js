/*  Programmer:     labthe3rd
 *  Date:           10/21/23
 *  Description:    The preload app will let us setup our communication between the react app and background.js, and stuff
 *
 */

import { contextBridge, ipcRenderer } from "electron";

//Initialize message response callback
let messageResponseCallback = null;

//Set up IPC handlers
const handler = {
  //Strafe movement commands for OPC
  sendMoveCommand: (direction, value) => {
    ipcRenderer.send("send-move-command", direction, value);
  },
  //Rotation commands for OPC
  sendRotationCommand: (value) => {
    ipcRenderer.send("send-rotation-command", value);
  },
  //Chatbox command OPC
  sendMessage: (message) => {
    ipcRenderer.send("send-message", message);
  },
  //Callback from sending message to chatbox
  setResponseCallback: (callback) => {
    messageResponseCallback = callback;
  },
  getConfig: () => {
    return ipcRenderer.invoke("get-config");
  },
  updateConfig: (newConfig) => {
    return ipcRenderer.invoke("update-config", newConfig);
  },
};

//Not sure if I need this...
ipcRenderer.on("message-response", (event, response) => {
  console.log("Preload event is called 1st");
  if (messageResponseCallback) {
    console.log("Callback being executed...");
    console.log(response);
    messageResponseCallback(response);
  }
});

contextBridge.exposeInMainWorld("ipc", handler);
