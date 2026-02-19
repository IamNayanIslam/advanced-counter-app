import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { CountersContext } from "../Contexts/CountersContext";

interface IProps {
  setAddCounterModal: (value: boolean) => void;
}

const AddCounterModal = ({ setAddCounterModal }: IProps) => {
  const [newCounter, setNewCounter] = useState({
    name: "",
    count: 0,
    id: uuidv4(),
    isActive: true,
    target: 99,
    lap: 33,
    isEditing: false,
  });

  const { dispatch } = useContext(CountersContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "number" ||
      e.target.name === "target" ||
      e.target.name === "lap"
        ? Number(e.target.value)
        : e.target.value;

    setNewCounter({ ...newCounter, [e.target.name]: value });
  };

  const handleAddCounter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCounter.name.trim() === "") {
      return toast.error("Name can't be empty!!!");
    }

    if (typeof newCounter.target !== "number" || !newCounter.target) {
      return toast.error("Target can't be empty");
    }

    if (typeof newCounter.lap !== "number" || !newCounter.lap) {
      return toast.error("Lap can't be empty");
    }

    dispatch({ type: "ADD_COUNTER", payload: newCounter });
    dispatch({ type: "TOGGLE_IS_ACTIVE", payload: newCounter.id });
    setNewCounter({ ...newCounter, name: "" });
    setAddCounterModal(false);
    toast.success(`New Counter ${newCounter.name.toUpperCase()} Added!!!`);
  };

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
        <form onSubmit={handleAddCounter} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-700">
              Counter name
            </label>
            <input
              type="text"
              placeholder="e.g. Istegfar"
              value={newCounter.name}
              name="name"
              onChange={handleChange}
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="target" className="text-sm text-gray-700">
              Target
            </label>
            <input
              type="text"
              value={newCounter.target}
              name="target"
              onChange={handleChange}
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lap" className="text-sm text-gray-700">
              Lap
            </label>
            <input
              type="text"
              value={newCounter.lap}
              name="lap"
              onChange={handleChange}
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
