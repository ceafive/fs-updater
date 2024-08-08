type AddNewDataProps = {
  newData: string;
  setNewData: React.Dispatch<React.SetStateAction<string>>;
};

const AddNewData = ({ newData, setNewData }: AddNewDataProps) => {
  return (
    <>
      <h1 className="mb-1">Add New Data</h1>
      <textarea
        name="update"
        id="update"
        rows={10}
        placeholder="Enter properly parsed JSON data to avoid errors"
        className="w-full bg-gray-800 rounded-lg text-gray-50 text-sm p-2 font-extralight italic"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
      />
    </>
  );
};

export default AddNewData;
