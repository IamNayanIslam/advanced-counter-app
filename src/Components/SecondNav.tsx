import { RiRestartFill } from "react-icons/ri";
import { CiCircleMinus } from "react-icons/ci";
import { MdPlaylistAddCircle } from "react-icons/md";
import { MdMotionPhotosAuto } from "react-icons/md";

interface IProps {
  setAddCounterModal: (value: boolean)=>void;
}

const SecondNav = ({setAddCounterModal}) => {
  return (
    <div>
      <div className="flex justify-between items-center bg-transparent px-4 py-4 mb-10">
        <button className="text-4xl text-gray-700 bg-cyan-600 p-2 rounded-full">
          <MdMotionPhotosAuto />
        </button>
        <div className="flex gap-4">
          <button className="text-2xl text-gray-700 bg-cyan-600 p-2 rounded-full">
            <RiRestartFill />
          </button>
          <button className="text-2xl text-gray-700 bg-cyan-600 p-2 rounded-full">
            <CiCircleMinus />
          </button>
          <button onClick={()=>setAddCounterModal(true)} className="text-2xl text-gray-700 bg-cyan-600 p-2 rounded-full">
            <MdPlaylistAddCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondNav;
