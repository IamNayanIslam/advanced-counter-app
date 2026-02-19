
import { useContext } from "react";
import { CountersContext, type ICounter } from "../Contexts/CountersContext";

interface IProps  {
  counter: ICounter
  setEditCounterNameModal: (value: boolean) => void
}

const CounterCircle = ({counter, setEditCounterNameModal}: IProps) => {
  
const {dispatch} = useContext(CountersContext)

  const handleIncrement = () => {
    dispatch({type: "INCREMENT_COUNT", payload: counter.id})
  };

  const handleNameEdit = (id: string) => {
    dispatch({type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: id})
    setEditCounterNameModal(true);
  }
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div
        onClick={handleIncrement}
        className="w-[300px] h-[300px] bg-cyan-600 rounded-full flex justify-center items-center cursor-pointer"
      >
        <h2 className="text-[120px] font-bold text-center text-gray-700 select-none">
          {counter.count}
        </h2>
      </div>
      <h2 onDoubleClick={()=>handleNameEdit(counter.id)} className="text-cyan-600 capitalize text-2xl font-bold select-none cursor-pointer">{counter.name}</h2>
    </div>
  );
};

export default CounterCircle;
