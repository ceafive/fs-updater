import { type IVSCode } from "../models";

type EmpireDataProps = {
  selected: string;
  databoxRef: React.RefObject<HTMLDivElement>;
  json: Record<string, any>;
  newlyAdded: string[];
  vscode: IVSCode;
};

const EmpireData = ({ selected, databoxRef, json, newlyAdded, vscode }: EmpireDataProps) => {
  return (
    <div className="">
      <h1 className="mb-1">{selected} Settings</h1>
      <div
        ref={databoxRef}
        className="max-h-[500px] overflow-y-scroll border border-green-500 rounded-lg p-2 scroll-smooth"
      >
        {Object.entries(json["Empire"]["Settings"])?.map((prop) => {
          const [key, value]: [string, any] = prop;

          return (
            <div className="flex items-start py-2">
              <button
                className="bg-red-500 text-white text-sm px-2 py-1 mr-2 mt-1"
                onClick={() =>
                  vscode.postMessage({
                    command: "confirm_delete",
                    key,
                    selected,
                  })
                }
              >
                Delete
              </button>
              <pre className={`${newlyAdded?.includes(key) ? "text-red-600" : "text-green-600"}`}>
                <span>{key}: </span>
                <span>{JSON.stringify(value, null, 2)}</span>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmpireData;
