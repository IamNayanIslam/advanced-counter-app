import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { CountersContext } from "../Contexts/CountersContext";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditCounterModal from "../Components/EditCounterModal";

const List = () => {
  const { countersState, dispatch } = useContext(CountersContext);
  const [editCounterModal, setEditCounterModal] = useState(false);
  const Navigate = useNavigate();
  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_COUNTER", payload: id });
  };

  const selectCounter = (id: string) => {
    dispatch({ type: "TOGGLE_IS_ACTIVE", payload: id });
    Navigate("/");
  };

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };


  const startCounterEdit = (id: string) => {
    setEditCounterModal((prevState)=> !prevState);
    dispatch({type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: id})
  }

  const counters = countersState.counters;
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <ul className="flex flex-col items-center gap-4 mt-8">
        {counters.map((counter) => (
          <li
            onClick={() => selectCounter(counter.id)}
            className={`flex gap-4 items-center justify-between p-4 w-[96%] rounded-md select-none ${counter.isActive ? "bg-cyan-600" : "bg-slate-400"}`}
            key={counter.id}
          >
            {`${counter.name} -- ${counter.count}`}{" "}
            <div onClick={handlePropagation} className="flex gap-4">
              <button onClick={()=>startCounterEdit(counter.id)}>
                <FaPen />
              </button>
              <button onClick={() => handleDelete(counter.id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editCounterModal && (
        <EditCounterModal setEditCounterModal={setEditCounterModal} />
      )}
    </div>
  );
};

export default List;
