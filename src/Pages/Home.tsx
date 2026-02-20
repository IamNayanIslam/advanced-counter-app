import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterCircle";
import AddCounterModal from "../Components/AddCounterModal";
import EditCounterNameModal from "../Components/EditCounterNameModal";
import HomeFooter from "../Components/HomeFooter";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const { countersState } = useContext(CountersContext);
  const [addCounterModal, setAddCounterModal] = useState(false);
  const [editCounterNameModal, setEditCounterNameModal] = useState(false);

  useEffect(() => {
    // বর্তমানে একটিভ কাউন্টারটি খুঁজে বের করা
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
