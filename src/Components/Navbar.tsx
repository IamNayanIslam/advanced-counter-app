import { IoMdHome } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { IoIosColorPalette } from "react-icons/io";
import { MdSettingsApplications } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemesContext } from "../Contexts/ThemseContext";
import { FaMosque } from "react-icons/fa6";

const Navbar = () => {
  const { themesState } = useContext(ThemesContext);

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center transition-all duration-300 ${
      isActive
        ? "bg-slate-950/20 shadow-inner px-2 py-1.5 rounded-xl gap-1"
        : "text-slate-900 opacity-70 hover:opacity-100 px-2 py-2 gap-2"
    }`;

  const navItems = [
    { to: "/", icon: <IoMdHome />, label: "Home" },
    { to: "/list", icon: <FaRegListAlt />, label: "List" },
    { to: "/prayer-times", icon: <FaMosque />, label: "Prayer" },
    { to: "/themes", icon: <IoIosColorPalette />, label: "Themes" },
    { to: "/settings", icon: <MdSettingsApplications />, label: "Settings" },
    { to: "/about", icon: <GrStatusInfo />, label: "About" },
  ];

  return (
    <div
      className={`py-2 px-1 bg-${themesState.theme}-400 border-b border-slate-950/10`}
    >
      <ul className="flex justify-between items-center h-10 w-full max-w-md mx-auto">
        {navItems.map((item) => (
          <li key={item.to} className="flex items-center">
            <NavLink to={item.to} className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <span
                    className={`${isActive ? "text-xl" : "text-2xl"} text-slate-950 transition-all`}
                  >
                    {item.icon}
                  </span>

                  {isActive && (
                    <span className="text-[10px] font-bold text-slate-950 animate-in fade-in slide-in-from-left-1 duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
