import { useContext } from "react";
import { SettingsContext } from "../Contexts/SettingsContext";
import { ThemesContext } from "../Contexts/ThemseContext";
import type {
  CounterShape,
  Language,
  ISettingsState,
  SettingsAction,
} from "../Reducers/SettingsReducer";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const Settings = () => {
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { themesState } = useContext(ThemesContext);

  const booleanOptions: {
    id: keyof ISettingsState;
    label: string;
    actionType: SettingsAction;
  }[] = [
    {
      id: "sound",
      label: "Sound Effect",
      actionType: { type: "TOGGLE_SOUND" },
    },
    {
      id: "vibration",
      label: "Vibration",
      actionType: { type: "TOGGLE_VIBRATION" },
    },
    {
      id: "minusButton",
      label: "Minus Button",
      actionType: { type: "TOGGLE_MINUS_BUTTON" },
    },
    {
      id: "lapDisplay",
      label: "Lap/Round Display",
      actionType: { type: "TOGGLE_LAP_DISPLAY" },
    },
    {
      id: "remainingCountDisplay",
      label: "Remaining Count Display",
      actionType: { type: "TOGGLE_REMAINING_COUNT_DISPLAY" },
    },
    {
      id: "volumeButtonControl",
      label: "Volume Button Control",
      actionType: { type: "TOGGLE_VOLUME_BUTTON_CONTROL" },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex-1 bg-[#0E1820] p-6 overflow-y-auto pb-24 text-white">
        <h2 className="text-2xl font-bold mb-8">Settings</h2>
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2 mb-4">
            Preference Controls
          </h3>
          {booleanOptions.map((option) => (
            <div
              key={option.id}
              className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex justify-between items-center transition-all hover:border-slate-600"
            >
              <span className="font-medium text-gray-200">{option.label}</span>

              <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => settingsDispatch(option.actionType)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${settingsState[option.id] ? `bg-${themesState.theme}-400 text-white shadow-lg` : "text-gray-500"}`}
                >
                  ON
                </button>
                <button
                  onClick={() => settingsDispatch(option.actionType)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!settingsState[option.id] ? "bg-rose-500 text-white shadow-lg" : "text-gray-500"}`}
                >
                  OFF
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">
              Button Shape
            </label>
            <div className="relative">
              <select
                value={settingsState.buttonShape}
                onChange={(e) =>
                  settingsDispatch({
                    type: "SET_SHAPE",
                    payload: e.target.value as CounterShape,
                  })
                }
                className={`w-full bg-slate-800/60 border border-slate-700 p-4 rounded-2xl appearance-none outline-none focus:border-${themesState.theme}-400 transition-all font-semibold capitalize`}
              >
                <option value="circle">Circle</option>
                <option value="cubical">Cubical</option>
                <option value="hexagon">Hexagon</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">
              App Info
            </label>
            <Link
              to="/about"
              className="flex justify-between items-center w-full bg-slate-800/60 border border-slate-700 p-4 rounded-2xl transition-all hover:border-slate-600 active:scale-[0.98] group"
            >
              <span className="font-semibold text-gray-200 flex gap-2 items-center">
                About App <FaInfoCircle />
              </span>

              <div className="relative">
                <div className="flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <span
                    className={`text-xl group-hover:text-${themesState.theme}-400`}
                  >
                    ➜
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
