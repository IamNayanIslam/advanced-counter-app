import { IoMdHome } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { IoIosColorPalette } from "react-icons/io";
import { MdSettingsApplications } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="py-4 px-4 bg-cyan-600">
      <ul className="flex justify-between">
        <li className="text-2xl text-gray-700">
          <Link to={"/"}>
            <IoMdHome />
          </Link>
        </li>
        <li className="text-2xl text-gray-700">
          <Link to={"/list"}>
            <FaRegListAlt />
          </Link>
        </li>
        <li className="text-2xl text-gray-700">
          <Link to={"/usage"}>
            <VscGraph />
          </Link>
        </li>
        <li className="text-2xl text-gray-700">
          <Link to={"/themes"}>
            <IoIosColorPalette />
          </Link>
        </li>
        <li className="text-2xl text-gray-700">
          <Link to={"/settings"}>
            <MdSettingsApplications />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
