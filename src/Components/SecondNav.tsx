import { RiRestartFill } from "react-icons/ri";
import { CiCircleMinus } from "react-icons/ci";
import { MdPlaylistAddCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";
import { SettingsContext } from "../Contexts/SettingsContext";

interface IProps {
  setAddCounterModal: (value: boolean) => void;
}

const SecondNav = ({ setAddCounterModal }: IProps) => {
  const { countersState, dispatch } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const { settingsState } = useContext(SettingsContext);

  const handleDecrement = (): void => {
    dispatch({ type: "DECREMENT_COUNT" });
  };

  const handleReset = () => {
    const activeCounter = countersState.counters.find(
      (counter) => counter.isActive,
    );
    if (activeCounter && activeCounter.count > 0) {
      toast(
        (t) => (
          <div className="flex flex-col gap-3 p-1">
            <p className="text-sm font-semibold text-gray-800">
              Are you sure you want to reset counter?
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
                  dispatch({ type: "RESET_COUNT" });
                  toast.dismiss(t.id);
                  toast.success("Counter Reseted!");
                }}
                className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
              >
                Reset
              </button>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: "top-center",
          style: {
            minWidth: "250px",
            border: "1px solid #e2e8f0",
          },
        },
      );
    }
  };
  return (
    <div>
      <div className="flex justify-end items-center bg-transparent px-4 py-4 mb-10">
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className={`text-2xl text-slate-950 bg-${themesState.theme}-400 p-2 rounded-full`}
          >
            <RiRestartFill />
          </button>
          {settingsState.minusButton && (
            <button
              onClick={handleDecrement}
              className={`text-2xl text-slate-950 bg-${themesState.theme}-400 p-2 rounded-full`}
            >
              <CiCircleMinus />
            </button>
          )}
          <button
            onClick={() => setAddCounterModal(true)}
            className={`text-2xl text-slate-950 bg-${themesState.theme}-400 p-2 rounded-full`}
          >
            <MdPlaylistAddCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondNav;
