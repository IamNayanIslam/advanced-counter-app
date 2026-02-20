import { useContext } from "react";
import { CountersContext, type ICounter } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";
import { SettingsContext } from "../Contexts/SettingsContext";

interface IProps {
  counter: ICounter;
  setEditCounterNameModal: (value: boolean) => void;
}

const coolInterFaceClickTone = new Audio("/cool-interface-click-tone-2568.wav");

const CounterComponent = ({ counter, setEditCounterNameModal }: IProps) => {
  const { dispatch } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const { settingsState } = useContext(SettingsContext);

  const getShapeClasses = () => {
    switch (settingsState.buttonShape) {
      case "circle":
        return "rounded-full";
      case "cubical":
        return "rounded-3xl";
      case "hexagon":
        return "clip-hexagon";
      default:
        return "rounded-full";
    }
  };
  const playClickSound = () => {
    coolInterFaceClickTone.currentTime = 0;
    coolInterFaceClickTone
      .play()
      .catch((error) => console.log("Audio error:", error));
  };

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleIncrement = () => {
    if (settingsState.vibration) triggerVibration();
    if (settingsState.sound) playClickSound();
    dispatch({ type: "INCREMENT_COUNT", payload: counter.id });
  };

  const handleNameEdit = (id: string) => {
    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: id });
    setEditCounterNameModal(true);
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div
        onClick={handleIncrement}
        className={`w-[300px] h-[300px] flex justify-center items-center cursor-pointer transition-all duration-300 
          bg-${themesState.theme}-400 
          ${getShapeClasses()} 
          active:scale-95 shadow-xl`}
      >
        <h2 className="text-[120px] font-bold text-center text-slate-950 select-none">
          {counter.count}
        </h2>
      </div>

      <h2
        onDoubleClick={() => handleNameEdit(counter.id)}
        className={`capitalize text-2xl font-bold select-none cursor-pointer text-${themesState.theme}-400`}
      >
        {counter.name}
      </h2>
    </div>
  );
};

export default CounterComponent;
