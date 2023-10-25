export default function PlayerButton() {
  return (
    <>
      <div className="border-red-500 box-border border-x-2 border-y-2 h-1/2 max-h-32 w-32 bg-blue-200">
        <div className="grid grid-cols-3 gap-0.5 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded col-start-2 text-center"
            onClick={() => {
              window.ipc.send("message", "Hello");
            }}
          >
            W
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded row-start-2"
            onClick={() => {
              window.ipc.send("message", "Hello");
            }}
          >
            S
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded row-start-2 col-start-2"
            onClick={() => {
              window.ipc.send("message", "Hello");
            }}
          >
            A
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded row-start-2 col-start-3"
            onClick={() => {
              window.ipc.send("message", "Hello");
            }}
          >
            D
          </button>
        </div>
      </div>
    </>
  );
}
