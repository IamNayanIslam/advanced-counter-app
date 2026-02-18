
import { useContext } from "react";
import { CountersContext, type ICounter } from "../Contexts/CountersContext";

interface IProps  {
  counter: ICounter
}

const CounterCircle = ({counter}: IProps) => {
  
const {dispatch} = useContext(CountersContext)

  const handleIncrement = () => {
    dispatch({type: "INCREMENT_COUNT", payload: counter.id})
  };
  return (
    <div className="flex justify-center">
      <div
        onClick={handleIncrement}
        className="w-[300px] h-[300px] bg-cyan-600 rounded-full flex justify-center items-center"
      >
        <h2 className="text-[120px] font-bold text-center text-gray-700 select-none">
          {counter.count}
        </h2>
      </div>
    </div>
  );
};

export default CounterCircle;
