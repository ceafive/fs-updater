import { chunkArrayByTwo, findNewestProperties, splitByNextEcommerce } from "../utils";
import { isEmpty } from "lodash";

type onAddProps = {
  newData: string;
  setNewlyAdded: React.Dispatch<React.SetStateAction<string[]>>;
  json: Record<string, any>;
  selected: string;
  oldData: Record<string, any>;
  setChangedData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  territory: string;
  language: string;
  setJson: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  databoxRef: React.RefObject<HTMLDivElement>;
};

type onSaveToFileProps = {
  json: Record<string, any>;
  vscode: any;
};

type onDeleteProps = {
  newData: string;
  setNewlyAdded: React.Dispatch<React.SetStateAction<string[]>>;
  json: Record<string, any>;
  selected: string;
  oldData: Record<string, any>;
  setChangedData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  territory: string;
  language: string;
  setJson: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  databoxRef: React.RefObject<HTMLDivElement>;
  keyToDelete: string;
};

export const onAdd = ({
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
}: onAddProps) => {
  try {
    const parseData = chunkArrayByTwo(splitByNextEcommerce(newData));
    let newJson: Record<string, any> = { ...json };

    parseData.forEach((data) => {
      let [key, value] = data;
      key = key.replaceAll(":", "").replaceAll('""', '"').replaceAll('"', "").trim();
      setNewlyAdded((keys) => [...keys, key]);
      value = value.replaceAll("},,", "},").replaceAll("},", "}").replaceAll(",}", "}");
      try {
        const newValue = JSON.parse(value);
        if (selected === "Empire") {
          newJson = {
            ...newJson,
            [selected]: {
              ...newJson[selected],
              Settings: {
                ...newJson[selected]["Settings"],
                [key]: newValue,
              },
            },
          };

          const result = findNewestProperties(newJson["Empire"]["Settings"], oldData["Empire"]["Settings"]);
          setChangedData((data) => {
            const args: Record<string, any> = {};
            const newData: Record<string, any> = { ...data };
            result?.forEach((key) => {
              args[selected] = {
                ...newData?.[selected],
                ...args?.[selected],
                [key]: newJson[selected]["Settings"][key],
              };
            });

            return { ...newData, ...args };
          });
        } else {
          if (!territory && !language) {
            newJson = {
              ...newJson,
              Empire: {
                ...newJson["Empire"],
                Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                  if (realm?.RealmName === selected) {
                    return {
                      ...realm,
                      Settings: {
                        ...realm?.Settings,
                        [key]: newValue,
                      },
                    };
                  }
                  return realm;
                }),
              },
            };

            const realmNewData = newJson["Empire"]["Realms"].find(
              (realm: Record<string, any>) => realm?.RealmName === selected
            );
            const realmOldData = oldData["Empire"]["Realms"].find(
              (realm: Record<string, any>) => realm?.RealmName === selected
            );

            const result = findNewestProperties(realmNewData["Settings"], realmOldData["Settings"]);
            setChangedData((data) => {
              const args: Record<string, any> = {};
              const newData: Record<string, any> = { ...data };
              result?.forEach((key) => {
                args[selected] = {
                  ...newData?.[selected],
                  ...args?.[selected],

                  [key]: realmNewData["Settings"][key],
                };
              });

              return { ...newData, ...args };
            });
          }

          if (territory && !language) {
            newJson = {
              ...newJson,
              Empire: {
                ...newJson["Empire"],
                Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                  if (realm?.RealmName === selected) {
                    return {
                      ...realm,
                      Territories: realm?.Territories.map((t: Record<string, any>) => {
                        if (t?.TerritoryName === territory) {
                          return {
                            ...t,
                            Settings: {
                              ...t?.Settings,
                              [key]: newValue,
                            },
                          };
                        }
                        return t;
                      }),
                    };
                  }
                  return realm;
                }),
              },
            };

            const territoryNew = newJson["Empire"]["Realms"]
              .find((realm: Record<string, any>) => realm?.RealmName === selected)
              ?.Territories.find((t: Record<string, any>) => t?.TerritoryName === territory);

            const territoryOld = oldData["Empire"]["Realms"]
              .find((realm: Record<string, any>) => realm?.RealmName === selected)
              ?.Territories.find((t: Record<string, any>) => t?.TerritoryName === territory);

            const result = findNewestProperties(territoryNew["Settings"], territoryOld["Settings"]);

            setChangedData((data) => {
              const args: Record<string, any> = {};
              const newData: Record<string, any> = { ...data };
              result?.forEach((key) => {
                args[selected] = {
                  ...newData?.[selected],
                  ...args?.[selected],
                  [territory]: {
                    ...(newData?.[selected]?.[territory] || {}),
                    ...(args?.[selected]?.[territory] || {}),
                    [key]: territoryNew["Settings"][key],
                  },
                };
              });

              return { ...newData, ...args };
            });
          }

          if (territory && language) {
            newJson = {
              ...newJson,
              Empire: {
                ...newJson["Empire"],
                Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                  if (realm?.RealmName === selected) {
                    return {
                      ...realm,
                      Territories: realm?.Territories.map((t: Record<string, any>) => {
                        if (t?.TerritoryName === territory) {
                          return {
                            ...t,
                            Languages: t?.Languages.map((l: Record<string, any>) => {
                              if (l?.LanguageName === language) {
                                return {
                                  ...l,
                                  Settings: {
                                    ...l?.Settings,
                                    [key]: newValue,
                                  },
                                };
                              }
                              return l;
                            }),
                          };
                        }
                        return t;
                      }),
                    };
                  }
                  return realm;
                }),
              },
            };

            const languageNew = newJson["Empire"]["Realms"]
              .find((realm: Record<string, any>) => realm?.RealmName === selected)
              ?.Territories.find((t: Record<string, any>) => t?.TerritoryName === territory)
              ?.Languages.find((l: Record<string, any>) => l?.LanguageName === language);

            const languageOld = oldData["Empire"]["Realms"]
              .find((realm: Record<string, any>) => realm?.RealmName === selected)
              ?.Territories.find((t: Record<string, any>) => t?.TerritoryName === territory)
              ?.Languages.find((l: Record<string, any>) => l?.LanguageName === language);

            const result = findNewestProperties(languageNew["Settings"], languageOld["Settings"]);

            setChangedData((data) => {
              const args: Record<string, any> = {};
              const newData: Record<string, any> = { ...data };
              result?.forEach((key) => {
                args[selected] = {
                  ...newData[selected],
                  ...args[selected],
                  [territory]: {
                    ...(newData?.[selected]?.[territory] || {}),
                    ...(args?.[selected]?.[territory] || {}),
                    [language]: {
                      ...(newData?.[selected]?.[territory]?.[language] || {}),
                      ...(args?.[selected]?.[territory]?.[language] || {}),
                      [key]: languageNew["Settings"][key],
                    },
                  },
                };
              });

              return { ...newData, ...args };
            });
          }
        }
      } catch (error) {
        console.log("hfdffa");
      }
    });

    setJson(newJson);
    databoxRef.current!.scrollTop = databoxRef.current!.scrollHeight + 100;
  } catch (error) {
    console.error(error);
  }
};

export const onSaveToFile = ({ json, vscode }: onSaveToFileProps) => {
  try {
    const data = JSON.stringify(json, null, 0.1);
    vscode.postMessage({ command: "save_to_file", newData: data });
  } catch (error) {
    console.log(error);
  }
};

export const onDelete = ({
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
}: onDeleteProps) => {
  try {
    if (!isEmpty(json)) {
      console.log({ keyToDelete, selected, territory, language });
      let newJson: Record<string, any> = { ...json };

      if (selected === "Empire") {
        delete newJson[selected]["Settings"][keyToDelete];
        setNewlyAdded((keys) => keys.filter((key) => key !== keyToDelete));
        setChangedData((data) => {
          delete data?.[selected]?.[keyToDelete];
          return data;
        });
        setJson(newJson);
      }

      if (selected !== "Empire") {
        if (!territory && !language) {
          newJson = {
            ...newJson,
            Empire: {
              ...newJson["Empire"],
              Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                if (realm?.RealmName === selected) {
                  delete realm?.Settings[keyToDelete];
                  return realm;
                }
                return realm;
              }),
            },
          };

          setNewlyAdded((keys) => keys.filter((key) => key !== keyToDelete));
          setChangedData((data) => {
            delete data?.[selected]?.[keyToDelete];
            return data;
          });
          setJson(newJson);
        }

        if (territory && !language) {
          newJson = {
            ...newJson,
            Empire: {
              ...newJson["Empire"],
              Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                if (realm?.RealmName === selected) {
                  return {
                    ...realm,
                    Territories: realm?.Territories.map((t: Record<string, any>) => {
                      if (t?.TerritoryName === territory) {
                        delete t?.Settings[keyToDelete];
                        return t;
                      }
                      return t;
                    }),
                  };
                }
                return realm;
              }),
            },
          };

          setNewlyAdded((keys) => keys.filter((key) => key !== keyToDelete));
          setChangedData((data) => {
            delete data?.[selected]?.[territory]?.[keyToDelete];
            return data;
          });
          setJson(newJson);
        }

        if (territory && language) {
          newJson = {
            ...newJson,
            Empire: {
              ...newJson["Empire"],
              Realms: newJson["Empire"]["Realms"].map((realm: Record<string, any>) => {
                if (realm?.RealmName === selected) {
                  return {
                    ...realm,
                    Territories: realm?.Territories.map((t: Record<string, any>) => {
                      if (t?.TerritoryName === territory) {
                        return {
                          ...t,
                          Languages: t?.Languages.map((l: Record<string, any>) => {
                            if (l?.LanguageName === language) {
                              delete l?.Settings[keyToDelete];
                              return l;
                            }
                            return l;
                          }),
                        };
                      }
                      return t;
                    }),
                  };
                }
                return realm;
              }),
            },
          };

          setNewlyAdded((keys) => keys.filter((key) => key !== keyToDelete));
          setChangedData((data) => {
            delete data?.[selected]?.[territory]?.[language]?.[keyToDelete];
            return data;
          });
          setJson(newJson);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
