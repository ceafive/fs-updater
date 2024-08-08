type RealmsProps = {
  realms: Record<string, any>[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setTerritories: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  setLanguages: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  setTerritory: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const Realms = ({
  realms,
  selected,
  setSelected,
  setTerritories,
  setLanguages,
  setTerritory,
  setLanguage,
}: RealmsProps) => {
  return (
    <>
      {realms?.length > 0 && (
        <div className="my-3">
          <h1>Realms</h1>
          <div className="flex flex-wrap gap-2 gap-x-3 border border-gray-700 p-5">
            {realms?.map((realm: Record<string, any>) => {
              return (
                <button
                  className={`${selected === realm?.RealmName ? "bg-green-800" : "bg-gray-500"} w-2/12 text-white p-2`}
                  onClick={() => {
                    setSelected(realm?.RealmName);
                    setTerritories(realm?.Territories);
                    setLanguages([]);
                    setTerritory("");
                    setLanguage("");
                  }}
                >
                  {realm?.RealmName || ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Realms;
