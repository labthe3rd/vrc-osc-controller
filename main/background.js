/*  Programmer:     labthe3rd
 *  Date:           10/21/23
 *  Description:    An electron app that sends OSC messages to VRChat
 *
 */

import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import osc from "osc";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

//Define and start udp port
let udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121,
  remoteAddress: "127.0.0.1",
  remotePort: 9000,
});
udpPort.open();

//Utility functions
//Get system IP Address
function getIPAddress() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return "0.0.0.0";
}

async function sendMessage(message) {
  try {
    udpPort.send({
      address: "/chatbox/input",
      args: [message, true],
    });
  } catch (err) {
    console.log(err);
  }
}

//use for sending move directions
async function sendOSCCommand(address, value) {
  try {
    console.log(`Sending ${value} to OSC at ${address}`);
    udpPort.send({
      address: address,
      args: [value, true],
    });
  } catch (err) {
    console.log(err);
  }
}

//Send move osc command here
ipcMain.on("send-move-command", (event, direction, value) => {
  // Call your sendOSCCommand function here
  console.log(`Sending ${direction} with value of ${value}`);
  switch (direction) {
    case "Vertical":
      sendOSCCommand("/input/Vertical", value);
      break;
    case "Horizontal":
      sendOSCCommand("/input/Horizontal", value);
      break;
    default:
      console.log("Invalid direction");
  }
});

//Horizontal Rotation command here
ipcMain.on("send-rotation-command", (event, value) => {
  console.log(`Rotating with value of ${value}`);
  sendOSCCommand("/input/LookHorizontal", value);
});

//Send osc message here
ipcMain.on("send-message", (event, message) => {
  sendMessage(message);
  console.log(`Sending message: ${message}`);
  event.reply("message-response", { status: "ok" });
});
