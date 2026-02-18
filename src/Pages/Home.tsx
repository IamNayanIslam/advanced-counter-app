import { useContext } from "react";
import Navbar from "../Components/Navbar";
import SecondNav from "../Components/SecondNav";
import { CountersContext } from "../Contexts/CountersContext";
import CounterCircle from "../Components/CounterCircle";


const Home = () => {
  const {countersState} = useContext(CountersContext);
  
  
  return (
    <div>
      <Navbar />
      <SecondNav/>
      {countersState.counters.map((counter)=> counter.isActive && <CounterCircle key={counter.id} counter={counter}/>)}
    </div>
  );
};

export default Home;
