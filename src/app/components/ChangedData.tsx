type ChangedDataProps = {
  changedData: Record<string, any>;
  databoxRef: React.RefObject<HTMLDivElement>;
};

const ChangedData = ({ changedData, databoxRef }: ChangedDataProps) => {
  return (
    <div className="mt-2">
      <h1 className="">Changed Data</h1>
      <p className="italic text-xs text-center mt-1">
        If you don't find all data added here, then you have overwritten some
      </p>
      <div>
        <div ref={databoxRef} className="max-h-[500px] overflow-y-scroll border border-gray-100 rounded-lg p-2">
          {Object.entries(changedData)?.map((prop) => {
            const [key, value]: [string, any] = prop;

            return (
              <pre className="">
                <span className="text-green-500">{key}: </span>
                <span className="text-red-500">{JSON.stringify(value, null, 2)}</span>
              </pre>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangedData;
