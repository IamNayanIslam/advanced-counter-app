import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import List from "./Pages/List";
import Themes from "./Pages/Themes";
import Settings from "./Pages/Settings";
import Error from "./Pages/Error";

import About from "./Pages/About";
import { useState } from "react";
import PrayerTimes from "./Pages/PrayerTimes";

function App() {
  const [addCounterModal, setAddCounterModal] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-slate-950">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  addCounterModal={addCounterModal}
                  setAddCounterModal={setAddCounterModal}
                />
              }
            />
            <Route
              path="/list"
              element={
                <List
                  addCounterModal={addCounterModal}
                  setAddCounterModal={setAddCounterModal}
                />
              }
            />
            <Route path="/themes" element={<Themes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
