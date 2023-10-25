import React, { useEffect, useState } from "react";

function ConfigForm() {
  const [config, setConfig] = useState({});

  //Success message when app has been saved
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Fetch the config on mount
    window.ipc.getConfig().then((conf) => setConfig(conf));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleSave = () => {
    // Send the updated config back to the main process
    window.ipc.updateConfig(config);
    //Now display success message informing user to restart app
    setSuccessMessage("Success! Please restart the app.");
  };

  const validIPAddress = (address) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(address);
  };

  const validPort = (port) => {
    const regex =
      /^(6553[0-5]|655[0-2]\d|65[0-4]\d\d|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3})$/;
    return regex.test(port);
  };

  //Allow users to reset the ports
  const handleDefaults = () => {
    const defaultConfig = {
      localAddress: "0.0.0.0",
      localPort: "9001",
      remoteAddress: "127.0.0.1",
      remotePort: "9000",
    };

    setConfig(defaultConfig);
    setSuccessMessage("Config Reset! Restart the app!");
  };

  return (
    <React.Fragment>
      <div className="flex justify-center">
        <div className="w-full max-w-xs justify-center">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {["localAddress", "localPort", "remoteAddress", "remotePort"].map(
              (field, index) => (
                <div className="mb-4" key={index}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={field}
                  >
                    {field.split(/(?=[A-Z])/).join(" ")}:
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      field.includes("Address") &&
                      !validIPAddress(config[field]) &&
                      "border-red-500"
                    } ${
                      field.includes("Port") &&
                      !validPort(config[field]) &&
                      "border-red-500"
                    }`}
                    id={field}
                    name={field}
                    type="text"
                    placeholder={field}
                    value={config[field] || ""}
                    onChange={handleInputChange}
                  />
                  {field.includes("Address") &&
                    !validIPAddress(config[field]) && (
                      <p className="text-red-500 text-xs italic">
                        Invalid IP Address.
                      </p>
                    )}
                  {field.includes("Port") && !validPort(config[field]) && (
                    <p className="text-red-500 text-xs italic">Invalid Port.</p>
                  )}
                </div>
              )
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
              <button
                onClick={handleDefaults}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Defaults
              </button>
            </div>
            {successMessage && (
              // 3. Render the successMessage
              <div className="mt-4 text-green-500 font-bold text-center">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConfigForm;
