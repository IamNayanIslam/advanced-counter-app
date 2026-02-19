import { useContext, useState } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import toast from "react-hot-toast";


interface IProps {
  setEditCounterNameModal: (value: boolean) => void;
}

const EditCounterNameModal = ({setEditCounterNameModal}: IProps) => {

    const{countersState, dispatch} = useContext(CountersContext)
  const [updatedCounter, setUpdatedCounter] = useState(countersState.counters.filter((counter)=>counter.id === countersState.counterToBeUpdatedId)[0])
  const closeEditCounterNameModal = () => {
    setEditCounterNameModal(false);
     dispatch({type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: ""})
  };

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setUpdatedCounter({...updatedCounter, [e.target.name]: e.target.value})
  }

  const handleCounterUpdate = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if (updatedCounter.name.trim() === "") {
      return toast.error("Name can't be empty!!!");
    }

    dispatch({type: "UPDATE_COUNTER", payload: updatedCounter})
    dispatch({type: "SET_COUNTER_TO_BE_UPDATED_ID", payload: ""})
    setEditCounterNameModal(false)
  }
  return (
    <div
      onClick={closeEditCounterNameModal}
      className="fixed inset-0 z-50 w-full min-h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center"
    >
      <div
        onClick={handlePropagation}
        className="w-[300px] bg-white rounded-xl p-4"
      >
        <h2 className="text-xl text-center mb-4">Change Counter Name</h2>
        <form onSubmit={handleCounterUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-700">
              Counter name
            </label>
            <input
              type="text"
              value={updatedCounter.name}
              name="name"
              onChange={handleChange} 
              className=" border-b-2 border-gray-600 focus:border-cyan-600 outline-none bg-transparent"
            />
          </div>

          <button className="bg-cyan-600 text-white w-1/4 px-2 py-1 rounded-full self-center">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditCounterNameModal