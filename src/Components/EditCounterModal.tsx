import { useContext, useState } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import toast from "react-hot-toast";
import { ThemesContext } from "../Contexts/ThemseContext";

interface IProps {
  setEditCounterModal: (value: boolean) => void;
}

const EditCounterModal = ({ setEditCounterModal }: IProps) => {
  const { countersState, dispatch } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const [updatedCounter, setUpdatedCounter] = useState(
    countersState.counters.filter(
      (counter) => counter.id === countersState.counterToBeUpdatedId,
    )[0],
  );
  const closeEditCounterModal = () => {
    setEditCounterModal(false);
    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: "" });
  };

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCounter({ ...updatedCounter, [e.target.name]: e.target.value });
  };

  const handleCounterUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updatedCounter.name.trim() === "") {
      return toast.error("Name can't be empty!!!");
    }

    if (typeof updatedCounter.count !== "number") {
      return toast.error("Count be a number");
    }

    if (typeof updatedCounter.target !== "number" || !updatedCounter.target) {
      return toast.error("Target can't be empty");
    }

    if (typeof updatedCounter.lap !== "number" || !updatedCounter.lap) {
      return toast.error("Lap can't be empty");
    }

    dispatch({ type: "UPDATE_COUNTER", payload: updatedCounter });
    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: "" });
    setEditCounterModal(false);
  };
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
        <form onSubmit={handleCounterUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-700">
              Counter name
            </label>
            <input
              type="text"
              value={updatedCounter.name}
              name="name"
              onChange={handleChange}
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent`}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="count" className="text-sm text-gray-700">
              Count
            </label>
            <input
              type="number"
              value={updatedCounter.count}
              name="count"
              onChange={handleChange}
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent`}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="target" className="text-sm text-gray-700">
              Target
            </label>
            <input
              type="number"
              value={updatedCounter.target}
              name="target"
              onChange={handleChange}
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lap" className="text-sm text-gray-700">
              Lap
            </label>
            <input
              type="number"
              value={updatedCounter.lap}
              name="lap"
              onChange={handleChange}
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent`}
            />
          </div>
          <button
            className={`bg-${themesState.theme}-400 text-white w-1/4 px-2 py-1 rounded-full self-center`}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCounterModal;
