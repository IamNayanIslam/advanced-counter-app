import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { CountersContext } from "../Contexts/CountersContext";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const List = () => {
  const { countersState, dispatch } = useContext(CountersContext);
  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_COUNTER", payload: id });
  };

  const counters = countersState.counters;
  return (
    <div>
      <Navbar />
      <ul className="flex flex-col items-center gap-4 mt-8">
        {counters.map((counter) => (
          <li
            className={`flex gap-4 items-center justify-between p-4 w-[96%] rounded-md ${counter.isActive ? "bg-cyan-600" : "bg-slate-400"}`}
            key={counter.id}
          >
            {`${counter.name} -- ${counter.count}`}{" "}
            <div className="flex gap-4">
              <FaPen />{" "}
              <button onClick={() => handleDelete(counter.id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
