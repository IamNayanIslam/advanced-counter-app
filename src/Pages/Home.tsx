import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterComponent";
import AddCounterModal from "../Components/AddCounterModal";
import EditCounterNameModal from "../Components/EditCounterNameModal";
import HomeFooter from "../Components/HomeFooter";
import { Toaster } from "react-hot-toast";

interface IProps {
  addCounterModal: boolean;
  setAddCounterModal: (value: boolean) => void;
}

const Home = ({ addCounterModal, setAddCounterModal }: IProps) => {
  const { countersState } = useContext(CountersContext);

  const [editCounterNameModal, setEditCounterNameModal] = useState(false);

  return (
    <div className="fixed inset-0 h-[100dvh] flex flex-col overflow-hidden touch-none bg-[#0E1820]">
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
