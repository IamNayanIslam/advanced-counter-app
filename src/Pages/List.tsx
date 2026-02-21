import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { CountersContext } from "../Contexts/CountersContext";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditCounterModal from "../Components/EditCounterModal";

import toast, { Toaster } from "react-hot-toast";
import { ThemesContext } from "../Contexts/ThemseContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import AddCounterModal from "../Components/AddCounterModal";
import SecondNav from "../Components/SecondNav";

const deleteSound = new Audio("/delete.mp3");
interface IProps {
  addCounterModal: boolean;
  setAddCounterModal: (value: boolean) => void;
}

const List = ({ addCounterModal, setAddCounterModal }: IProps) => {
  const { countersState, dispatch } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const { settingsState } = useContext(SettingsContext);
  const [editCounterModal, setEditCounterModal] = useState(false);
  const Navigate = useNavigate();

  const deleteCounterSound = () => {
    deleteSound.currentTime = 0;
    deleteSound.play().catch((error) => console.log("Audio error:", error));
  };

  const handleDelete = (id: string) => {
    if (countersState.counters.length === 1) {
      toast.remove();
      return toast.error("Can't Delete all the Counters!!!");
    }

    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-gray-800">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (settingsState.sound) {
                  deleteCounterSound();
                }

                toast.dismiss(t.id);

                dispatch({ type: "DELETE_COUNTER", payload: id });
              }}
              className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        id: "delete-confirmation",
        duration: 5000,
        position: "top-center",
      },
    );
  };

  const selectCounter = (id: string) => {
    dispatch({ type: "TOGGLE_IS_ACTIVE", payload: id });
    Navigate("/");
  };

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const startCounterEdit = (id: string) => {
    setEditCounterModal((prevState) => !prevState);
    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: id });
  };

  const counters = countersState.counters;
  return (
    <div className="relative min-h-screen">
      <Toaster />
      <Navbar />
      <SecondNav setAddCounterModal={setAddCounterModal} />
      <ul className="flex flex-col items-center gap-4 mt-4">
        {counters.map((counter) => (
          <li
            onClick={() => selectCounter(counter.id)}
            className={`flex gap-4 items-center justify-between p-4 w-[96%] rounded-md select-none ${counter.isActive ? `bg-${themesState.theme}-400` : "bg-slate-400"}`}
            key={counter.id}
          >
            {`${counter.name} -- ${counter.count}`}{" "}
            <div onClick={handlePropagation} className="flex gap-4">
              <button onClick={() => startCounterEdit(counter.id)}>
                <FaPen />
              </button>
              <button onClick={() => handleDelete(counter.id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editCounterModal && (
        <EditCounterModal setEditCounterModal={setEditCounterModal} />
      )}
      {addCounterModal && (
        <AddCounterModal setAddCounterModal={setAddCounterModal} />
      )}
    </div>
  );
};

export default List;
