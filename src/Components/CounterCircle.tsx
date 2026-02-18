import { useState } from "react";

const CounterCircle = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div className="flex justify-center">
      <div
        onClick={handleIncrement}
        className="w-[300px] h-[300px] bg-cyan-600 rounded-full flex justify-center items-center"
      >
        <h2 className="text-[120px] font-bold text-center text-gray-700 select-none">
          {count}
        </h2>
      </div>
    </div>
  );
};

export default CounterCircle;
