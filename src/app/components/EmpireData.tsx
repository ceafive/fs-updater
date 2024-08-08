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
    <div className="w-full">
      <h1 className="mb-1">{selected} Settings</h1>
      <div
        ref={databoxRef}
        className="max-h-[500px] overflow-y-scroll border border-green-500 rounded-lg p-2 scroll-smooth"
      >
        {Object.entries(json["Empire"]["Settings"])?.map((prop) => {
          const [key, value]: [string, any] = prop;
          const newValue = { ...(value as unknown as Record<string, any>) };

          return (
            <div className="flex justify-between items-center">
              <pre className={`${newlyAdded?.includes(key) ? "text-red-600" : "text-green-600"} py-1`}>
                <span>{key}: </span>
                <span>{JSON.stringify(newValue, null, 2)}</span>
              </pre>
              <button
                className="bg-red-500 text-white text-sm px-2 py-1"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmpireData;
