import { useContext } from "react";
import Navbar from "../Components/Navbar";
import ThemeComponent from "../Components/ThemeComponent";
import { ThemesContext } from "../Contexts/ThemseContext";

const Themes = () => {
  const { dispatch } = useContext(ThemesContext);

  const selectTheme = (
    color: "cyan" | "teal" | "violet" | "indigo" | "emerald" | "rose",
  ) => {
    dispatch({ type: "SET_THEME", payload: color });
  };
  return (
    <div className="flex flex-col h-fit">
      <Navbar />
      <h2>Select Themes</h2>
      <div className="flex flex-wrap justify-center content-center gap-x-8 gap-y-4 flex-1 mb-4">
        <button onClick={() => selectTheme("cyan")}>
          <ThemeComponent bg="cyan" />
        </button>
        <button onClick={() => selectTheme("teal")}>
          <ThemeComponent bg="teal" />
        </button>
        <button onClick={() => selectTheme("violet")}>
          <ThemeComponent bg="violet" />
        </button>
        <button onClick={() => selectTheme("indigo")}>
          <ThemeComponent bg="indigo" />
        </button>
        <button onClick={() => selectTheme("emerald")}>
          <ThemeComponent bg="emerald" />
        </button>
        <button onClick={() => selectTheme("rose")}>
          <ThemeComponent bg="rose" />
        </button>
      </div>
    </div>
  );
};

export default Themes;

//cyan-400
//emerald-400
