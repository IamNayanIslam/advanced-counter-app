interface IProps {
  setAddCounterModal: (value: boolean) => void;
}

const AddCounterModal = ({ setAddCounterModal }: IProps) => {
  const closeAddCounterModal = () => {
    setAddCounterModal(false);
  };

  const handlePropogation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={closeAddCounterModal}
      className="fixed inset-0 z-50 w-full min-h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center"
    >
      <div
        onClick={handlePropogation}
        className="w-[300px] bg-white rounded-xl p-4"
      >
        <h2 className="text-xl text-center mb-4">Add New Counter</h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="counterName" className="text-sm text-gray-700">
              Counter name
            </label>
            <input
              type="text"
              placeholder="e.g. Istegfar"
              value={""}
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="target" className="text-sm text-gray-700">
              Target
            </label>
            <input
              type="text"
              value={99}
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lap" className="text-sm text-gray-700">
              Lap
            </label>
            <input
              type="text"
              value={33}
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <button className="bg-cyan-600 text-white w-1/4 px-2 py-1 rounded-full self-center">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCounterModal;
