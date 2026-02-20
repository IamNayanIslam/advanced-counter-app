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

const Settings = () => {
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { themesState } = useContext(ThemesContext);

  // বুলিয়ান অপশনগুলোর লিস্ট
  // সরাসরি SettingsAction টাইপ ব্যবহার করুন
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

        {/* Boolean Options as Radio Buttons */}
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

              {/* Custom Radio Group */}
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
          {/* Language Selection Dropdown */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">
              Language
            </label>
            <div className="relative">
              <select
                value={settingsState.language}
                onChange={(e) =>
                  settingsDispatch({
                    type: "SET_LANGUAGE",
                    payload: e.target.value as Language,
                  })
                }
                className={`w-full bg-slate-800/60 border border-slate-700 p-4 rounded-2xl appearance-none outline-none focus:border-${themesState.theme}-400 transition-all font-semibold`}
              >
                <option value="english">English</option>
                <option value="bengali">Bengali</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Button Shape Dropdown */}
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
        </div>
      </div>
    </>
  );
};

export default Settings;
