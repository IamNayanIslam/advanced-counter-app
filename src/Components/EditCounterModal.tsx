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
    const { name, value, type } = e.target;

    setUpdatedCounter({
      ...updatedCounter,

      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCounterUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const countVal = Number(updatedCounter.count);
    const targetVal = Number(updatedCounter.target);
    const lapVal = Number(updatedCounter.lap);

    if (updatedCounter.name.trim() === "") {
      return toast.error("Name can't be empty!!!");
    }

    if (isNaN(countVal)) {
      return toast.error("Count must be a number");
    }

    if (isNaN(targetVal) || targetVal <= 0) {
      return toast.error("Target must be a valid number");
    }

    if (isNaN(lapVal) || lapVal <= 0) {
      return toast.error("Lap must be a valid number");
    }

    dispatch({
      type: "UPDATE_COUNTER",
      payload: {
        ...updatedCounter,
        count: countVal,
        target: targetVal,
        lap: lapVal,
      },
    });

    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: "" });
    setEditCounterModal(false);
    toast.success("Updated successfully!");
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
        <h2 className="text-xl text-center mb-4 text-gray-800">Edit Counter</h2>
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
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent text-gray-800`}
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
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent text-gray-800`}
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
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent text-gray-800`}
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
              className={`border-b-2 border-slate-600 focus:border-${themesState.theme}-400 outline-none bg-transparent text-gray-800`}
            />
          </div>
          <button
            type="submit"
            className={`bg-${themesState.theme}-400 text-white w-full py-2 mt-2 rounded-lg self-center shadow-md active:scale-95 transition-transform`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCounterModal;
