/*  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         React logic for OSC Controller logic
 */

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ConfigForm from "../components/ConfigForm";
import PlayerControls from "../components/PlayerControls";

export default function HomePage() {
  const [currentView, setCurrentView] = useState("Play"); // Default view set to "Play"

  //We will store message history at the parent component so it saves for the duration of the app being opened. I purposely did not use local storage
  const [messageHistory, setMessageHistory] = useState([]);

  return (
    <React.Fragment>
      <Head>
        <title>VRC OSC Controller</title>
      </Head>
      <>
        <div className="items-top flex h-screen w-screen justify-center">
          <div className="box-border h-full w-full space-y-2 border-4 border-black p-4">
            <h1 id="title" className="text-center text-sm font-bold">
              OSC Controller
            </h1>
            <p
              id="title"
              className="text-center text-xs font-bold text-blue-500"
            >
              Created by labthe3rd
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentView("Play")}
                className={`p-2 ${
                  currentView === "Play" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Play
              </button>
              <button
                onClick={() => setCurrentView("Config")}
                className={`p-2 ${
                  currentView === "Config" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Config
              </button>
            </div>

            {currentView === "Play" && (
              <PlayerControls
                messageHistory={messageHistory}
                setMessageHistory={setMessageHistory}
              />
            )}
            {currentView === "Config" && <ConfigForm />}
          </div>
        </div>
      </>
    </React.Fragment>
  );
}
