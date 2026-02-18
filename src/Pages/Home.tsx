import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterCircle";
import AddCounterModal from "../Components/AddCounterModal";


const Home = () => {
  const {countersState} = useContext(CountersContext);
  const [addCounterModal, setAddCounterModal] = useState(false);
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
      {countersState.counters.map((counter)=> counter.isActive && <CounterCircle key={counter.id} counter={counter}/>)}
      {addCounterModal && <AddCounterModal setAddCounterModal={setAddCounterModal}/>}
    </div>
  );
};

export default Home;
