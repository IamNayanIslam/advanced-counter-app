import { useContext } from "react";
import { CountersContext, type ICounter } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";

interface IProps {
  counter: ICounter;
  setEditCounterNameModal: (value: boolean) => void;
}

const CounterCircle = ({ counter, setEditCounterNameModal }: IProps) => {
  const { dispatch } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);

  const hardTypeWritterSound = new Audio("/hard-typewriter-click-1119.wav");

  const playClickSound = () => {
    // আগের সাউন্ড শেষ হওয়ার আগেই যদি আবার ক্লিক পড়ে, তবে এটি রিসেট করবে
    hardTypeWritterSound.currentTime = 0;
    hardTypeWritterSound
      .play()
      .catch((error) => console.log("Audio error:", error));
  };

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      // ৫০ মিলিসেকেন্ডের একটি ছোট ভাইব্রেশন (ট্যাপ ফিডব্যাক)
      navigator.vibrate(50);
    }
  };

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT_COUNT", payload: counter.id });
    triggerVibration();
    playClickSound();
  };

  const handleNameEdit = (id: string) => {
    dispatch({ type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: id });
    setEditCounterNameModal(true);
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div
        onClick={handleIncrement}
        className={`w-[300px] h-[300px] rounded-full flex justify-center items-center cursor-pointer bg-${themesState.theme}-400`}
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

export default CounterCircle;
