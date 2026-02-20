import { IoMdHome } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { IoIosColorPalette } from "react-icons/io";
import { MdSettingsApplications } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemesContext } from "../Contexts/ThemseContext";

const Navbar = () => {
  const { themesState } = useContext(ThemesContext);

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-slate-950/20 shadow-inner scale-105"
        : "text-slate-900 opacity-70 hover:opacity-100"
    }`;

  const navItems = [
    { to: "/", icon: <IoMdHome />, label: "Home" },
    { to: "/list", icon: <FaRegListAlt />, label: "List" },
    { to: "/themes", icon: <IoIosColorPalette />, label: "Themes" },
    { to: "/settings", icon: <MdSettingsApplications />, label: "Settings" },
    { to: "/about", icon: <GrStatusInfo />, label: "About" },
  ];

  return (
    <div
      className={`py-3 px-4 bg-${themesState.theme}-400 border-b border-slate-950/10`}
    >
      <ul className="flex justify-between items-center h-10">
        {navItems.map((item) => (
          <li key={item.to} className="flex items-center">
            <NavLink to={item.to} className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <span className="text-2xl text-slate-950">{item.icon}</span>
                  {isActive && (
                    <span className="text-sm font-bold text-slate-950 animate-in fade-in slide-in-from-left-2 duration-300">
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
