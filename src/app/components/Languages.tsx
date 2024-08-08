type LanguagesProps = {
  languages: Record<string, any>[];
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const Languages = ({ languages, language, setLanguage }: LanguagesProps) => {
  return (
    <>
      {languages?.length > 0 && (
        <div className="my-3">
          <h1>Languages</h1>
          <div className="flex flex-wrap gap-2 gap-x-3 border border-gray-700 p-5">
            {languages?.map((l: Record<string, any>) => {
              return (
                <button
                  className={`${language === l?.LanguageName ? "bg-green-800" : "bg-gray-500"} w-1/12 text-white p-2`}
                  onClick={() => {
                    setLanguage(l?.LanguageName);
                  }}
                >
                  {l?.LanguageName || ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Languages;
