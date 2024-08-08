import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { onAdd, onDelete, onSaveToFile } from "./services";
import EmpireData from "./components/EmpireData";
import RealmData from "./components/RealmData";
import ChangedData from "./components/ChangedData";
import Realms from "./components/Realms";
import Territories from "./components/Territories";
import Languages from "./components/Languages";
import AddNewData from "./components/AddNewData";
import { type IVSCode } from "./models";

declare const vscode: IVSCode;

const App = () => {
  const databoxRef = useRef<HTMLDivElement>(null!);
  const [loading, setLoading] = useState<boolean>(true);
  const [json, setJson] = useState<Record<string, any>>(null!);
  const [oldData, setOldData] = useState<Record<string, any>>(null!);
  const [selected, setSelected] = useState<string>("Empire");
  const [newData, setNewData] = useState<string>("");
  const [newlyAdded, setNewlyAdded] = useState<string[]>([]);
  const [realms, setRealms] = useState<Record<string, any>[]>([]);
  const [territories, setTerritories] = useState<Record<string, any>[]>([]);
  const [languages, setLanguages] = useState<Record<string, any>[]>([]);
  const [territory, setTerritory] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [changedData, setChangedData] = useState<Record<string, any>>({});

  const runOnDelete = useCallback(
    (keyToDelete: string, selected: string, territory: string, language: string) => {
      onDelete({
        newData,
        setNewlyAdded,
        json,
        selected,
        oldData,
        setChangedData,
        territory,
        language,
        setJson,
        databoxRef,
        keyToDelete,
      });
    },
    [newData, json, selected, oldData, territory, language]
  );

  window.addEventListener("message", async (event) => {
    const message = event.data;
    if (message.command === "download") {
      const parsed = JSON.parse(message.json);
      setJson(parsed);
      setOldData(Object.freeze(parsed));
      setRealms(parsed["Empire"]["Realms"]);
      setSelected("Empire");
      setLoading(false);
    }

    if (message.command === "delete") {
      const { key: keyToDelete, selected, territory, language } = message;
      runOnDelete(keyToDelete, selected, territory, language);
    }
  });

  const findRealmData = useMemo(() => {
    if (json) {
      const realmData = json["Empire"]["Realms"].find((realm: Record<string, any>) => realm?.RealmName === selected);
      let settings = {};
      if (!territory && !language) {
        settings = realmData?.Settings;
      }
      if (territory && !language) {
        settings = realmData?.Territories.find((t: Record<string, any>) => t?.TerritoryName === territory)?.Settings;
      }
      if (territory && language) {
        settings = realmData?.Territories.find(
          (t: Record<string, any>) => t?.TerritoryName === territory
        )?.Languages.find((l: Record<string, any>) => l?.LanguageName === language)?.Settings;
      }
      return settings;
    }
    return {};
  }, [selected, realms, json, territory, language]);

  // return (
  //   <div className="flex flex-col justify-center items-center min-h-screen">
  //     <h1 className="text-white text-6xl">Loading....</h1>
  //   </div>
  // );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-white text-6xl">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="">Feature Settings Updater</h1>
      <div className="flex justify-between">
        <div className="w-6/12">
          <div className="flex flex-col w-full">
            <button
              className={`${selected === "Empire" ? "bg-green-800" : "bg-gray-500"} text-white p-2`}
              onClick={() => {
                setSelected("Empire");
                setTerritories([]);
                setLanguages([]);
                setTerritory("");
                setLanguage("");
              }}
            >
              Empire
            </button>
            <Realms
              {...{
                realms,
                selected,
                setSelected,
                setTerritories,
                setLanguages,
                setTerritory,
                setLanguage,
              }}
            />
            <Territories
              {...{
                territories,
                territory,
                setTerritory,
                setLanguages,
                setLanguage,
              }}
            />
            <Languages
              {...{
                languages,
                language,
                setLanguage,
              }}
            />
          </div>

          <div className="mt-5 w-full">
            <AddNewData
              {...{
                newData,
                setNewData,
              }}
            />
            <div className="flex justify-end mt-2">
              <div className="flex w-1/2">
                <button
                  disabled={!newData?.length}
                  className={`${newData?.length ? "bg-red-600" : "bg-gray-400"} text-white px-4 py-2 w-full mr-2`}
                  onClick={() => setNewData("")}
                >
                  Clear
                </button>
                <button
                  disabled={!newData?.length}
                  className={`${newData?.length ? "bg-blue-600" : "bg-gray-400"} text-white px-4 py-2 w-full`}
                  onClick={() =>
                    onAdd({
                      newData,
                      setNewlyAdded,
                      json,
                      selected,
                      oldData,
                      setChangedData,
                      territory,
                      language,
                      setJson,
                      databoxRef,
                    })
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/12 justify-end">
          {selected === "Empire" && (
            <EmpireData
              {...{
                selected,
                databoxRef,
                json,
                newlyAdded,
                vscode,
              }}
            />
          )}

          {selected !== "Empire" && (
            <RealmData
              {...{
                selected,
                territory,
                language,
                databoxRef,
                findRealmData,
                newlyAdded,
                vscode,
              }}
            />
          )}

          {Object.entries(changedData)?.length > 0 && (
            <ChangedData
              {...{
                changedData,
                databoxRef,
              }}
            />
          )}
          {/* {newlyAdded?.length > 0 && ( */}
          <div className="flex justify-end mt-2">
            <div className="flex w-1/2">
              <button
                disabled={!json}
                className={`bg-green-900 text-white px-4 py-2 w-full`}
                onClick={() =>
                  onSaveToFile({
                    json,
                    vscode,
                  })
                }
              >
                Save
              </button>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default App;
