type TerritoriesProps = {
  territories: Record<string, any>[];
  territory: string;
  setTerritory: React.Dispatch<React.SetStateAction<string>>;
  setLanguages: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const Territories = ({ territories, territory, setTerritory, setLanguages, setLanguage }: TerritoriesProps) => {
  return (
    <>
      {territories?.length > 0 && (
        <div className="my-3">
          <h1>Territories</h1>
          <div className="flex flex-wrap gap-2 gap-x-3 border border-gray-700 p-5">
            {territories?.map((t: Record<string, any>) => {
              return (
                <button
                  className={`${territory === t?.TerritoryName ? "bg-green-800" : "bg-gray-500"} w-1/12 text-white p-2`}
                  onClick={() => {
                    setTerritory(t?.TerritoryName);
                    setLanguages(t?.Languages);
                    setLanguage("");
                  }}
                >
                  {t?.TerritoryName || ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Territories;
