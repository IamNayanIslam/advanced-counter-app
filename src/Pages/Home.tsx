import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterCircle";
import AddCounterModal from "../Components/AddCounterModal";
import EditCounterNameModal from "../Components/EditCounterNameModal";


const Home = () => {
  const {countersState} = useContext(CountersContext);
  const [addCounterModal, setAddCounterModal] = useState(false);
  const [editCounterNameModal, setEditCounterNameModal] = useState(false);
  /* const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(()=>{
    if(window.innerWidth > 768){
      setIsBigScreen(true);
    }
  }) */
  
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SecondNav setAddCounterModal={setAddCounterModal}/>
      {countersState.counters.map((counter)=> counter.isActive && <CounterCircle key={counter.id} counter={counter} setEditCounterNameModal={setEditCounterNameModal}/>)}
      {addCounterModal && <AddCounterModal setAddCounterModal={setAddCounterModal}/>}
      {editCounterNameModal && <EditCounterNameModal setEditCounterNameModal={setEditCounterNameModal}/>}
    </div>
  );
};

export default Home;
