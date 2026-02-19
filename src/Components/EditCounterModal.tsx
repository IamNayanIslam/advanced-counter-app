// import { /* useContext, */ useEffect /* useState */ } from "react";
// import { CountersContext } from "../Contexts/CountersContext";

interface IProps {
  setEditCounterModal: (value: boolean) => void;
}

const EditCounterModal = ({ setEditCounterModal }: IProps) => {
  //   const { /* dispatch, */ countersState } = useContext(CountersContext);
  /*  const [counterToUpdate, setCounterToUpdate] = useState(
    countersState.counters.filter((counter) => counter.isEditing)[0],
  );
 */
  const closeEditCounterModal = () => {
    setEditCounterModal(false);
  };

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  /*   useEffect(() => {
    console.log(counterToUpdate);
  }); */

  return (
    <div
      onClick={closeEditCounterModal}
      className="fixed inset-0 z-50 w-full min-h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center"
    >
      <div
        onClick={handlePropagation}
        className="w-[300px] bg-white rounded-xl p-4"
      >
        <h2 className="text-xl text-center mb-4">Edit Counter</h2>
        <form /* onSubmit={} */ className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-700">
              Counter name
            </label>
            <input
              type="text"
              //   value={counterToUpdate.name}
              name="name"
              /* onChange={} */
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="count" className="text-sm text-gray-700">
              Count
            </label>
            <input
              type="text"
              //   value={counterToUpdate.count}
              name="count"
              /* onChange={} */
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="target" className="text-sm text-gray-700">
              Target
            </label>
            <input
              type="text"
              //   value={counterToUpdate.target}
              name="target"
              /* onChange={} */
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lap" className="text-sm text-gray-700">
              Lap
            </label>
            <input
              type="text"
              //   value={counterToUpdate.lap}
              name="lap"
              /* onChange={} */
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

export default EditCounterModal;
