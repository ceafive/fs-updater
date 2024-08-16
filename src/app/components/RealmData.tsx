import { type IVSCode } from "../models";

type RealmDataProps = {
  selected: string;
  territory: string;
  language: string;
  databoxRef: React.RefObject<HTMLDivElement>;
  findRealmData: Record<string, any>;
  newlyAdded: string[];
  vscode: IVSCode;
};

const RealmData = ({
  selected,
  territory,
  language,
  databoxRef,
  findRealmData,
  newlyAdded,
  vscode,
}: RealmDataProps) => {
  return (
    <div className="w-full">
      <h1 className="mb-1">
        {selected} {territory} {language} Settings
      </h1>
      <div
        ref={databoxRef}
        className="max-h-[500px] overflow-y-scroll border border-green-500 rounded-lg p-2 scroll-smooth"
      >
        {Object.entries(findRealmData)?.map((prop) => {
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
                    territory,
                    language,
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

export default RealmData;
