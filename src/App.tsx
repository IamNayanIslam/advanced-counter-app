import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import List from "./Pages/List";
import Themes from "./Pages/Themes";
import Settings from "./Pages/Settings";
import Error from "./Pages/Error";
import Usage from "./Pages/Usage";
import About from "./Pages/about";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-950">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
