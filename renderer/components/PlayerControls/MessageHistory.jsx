/*
 *  programmer:   labthe3rd
 *  date:         10/24/23
 *  desc:         Message history when a chat message is sent
 *  fileName:     /components/PlayerControls/MessageHistory.jsx
 */

import React from "react";

export default function MessageHistory({ messageHistory }) {
  return (
    <React.Fragment>
      <h4 className="text-center text-xs font-bold">Messages History</h4>
      <textarea
        className="mb-4 resize-none h-1/4 w-full rounded bg-blue-500 pt-2 ps-2 font-semibold text-white shadow-md"
        readOnly
        value={messageHistory.join("\n")}
      ></textarea>
    </React.Fragment>
  );
}
