import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterCircle";
import AddCounterModal from "../Components/AddCounterModal";
import EditCounterNameModal from "../Components/EditCounterNameModal";
import HomeFooter from "../Components/HomeFooter";

const Home = () => {
  const { countersState } = useContext(CountersContext);
  const [addCounterModal, setAddCounterModal] = useState(false);
  const [editCounterNameModal, setEditCounterNameModal] = useState(false);

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
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
