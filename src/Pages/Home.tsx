import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import { SettingsContext } from "../Contexts/SettingsContext"; // SettingsContext ইমপোর্ট করুন
import CounterCircle from "../Components/CounterComponent";
import AddCounterModal from "../Components/AddCounterModal";
import EditCounterNameModal from "../Components/EditCounterNameModal";
import HomeFooter from "../Components/HomeFooter";
import toast, { Toaster } from "react-hot-toast";

const coolInterFaceClickTone = new Audio("/cool-interface-click-tone-2568.wav");

const Home = () => {
  const { countersState, dispatch } = useContext(CountersContext); // dispatch এড করুন
  const { settingsState } = useContext(SettingsContext); // সেটিংস স্টেট নিন

  const [addCounterModal, setAddCounterModal] = useState(false);
  const [editCounterNameModal, setEditCounterNameModal] = useState(false);

  const playClickSound = () => {
    coolInterFaceClickTone.currentTime = 0;
    coolInterFaceClickTone
      .play()
      .catch((error) => console.log("Audio error:", error));
  };
  // --- Volume Button Control Logic Start ---
  useEffect(() => {
    // ১. যদি সেটিংস থেকে ভলিউম কন্ট্রোল অফ থাকে তবে কাজ করবে না
    if (!settingsState.volumeButtonControl) return;

    const handleVolumeKeys = (e: KeyboardEvent) => {
      // ২. ইউজার যদি কোনো ইনপুটে টাইপ করে (যেমন নাম পরিবর্তন), তবে ভলিউম বাটন কাউন্টার বাড়াবে না
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const activeCounter = countersState.counters.find((c) => c.isActive);
      if (!activeCounter) return;

      if (e.key === "VolumeUp") {
        e.preventDefault(); // সিস্টেম ভলিউম বার হাইড করার চেষ্টা করবে
        dispatch({ type: "INCREMENT_COUNT", payload: activeCounter.id });

        // ভাইব্রেশন ও সাউন্ড ফিডব্যাক
        if (settingsState.vibration) navigator.vibrate(50);
        if (settingsState.sound) playClickSound();
      } else if (e.key === "VolumeDown" && settingsState.minusButton) {
        e.preventDefault();
        dispatch({ type: "DECREMENT_COUNT" });
      }
    };

    window.addEventListener("keydown", handleVolumeKeys);

    return () => window.removeEventListener("keydown", handleVolumeKeys);
  }, [countersState.counters, settingsState, dispatch]);

  useEffect(() => {
    const activeCounter = countersState.counters.find((c) => c.isActive);
    if (
      activeCounter &&
      activeCounter.count > 0 &&
      activeCounter.count === activeCounter.target
    ) {
      toast.success(
        `${activeCounter.name.toUpperCase()} - Target Completed! 🎉`,
        {
          duration: 5000,
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        },
      );
    }
  }, [countersState.counters]);

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <Toaster />
      <Navbar />
      <SecondNav setAddCounterModal={setAddCounterModal} />

      <main className="flex-1 flex items-center justify-center overflow-hidden">
        {countersState.counters.map(
          (counter) =>
            counter.isActive && (
              <CounterCircle
                key={counter.id}
                counter={counter}
                setEditCounterNameModal={setEditCounterNameModal}
              />
            ),
        )}
      </main>

      <HomeFooter />

      {addCounterModal && (
        <AddCounterModal setAddCounterModal={setAddCounterModal} />
      )}
      {editCounterNameModal && (
        <EditCounterNameModal
          setEditCounterNameModal={setEditCounterNameModal}
        />
      )}
    </div>
  );
};

export default Home;
