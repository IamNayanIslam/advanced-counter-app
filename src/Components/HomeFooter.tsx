import { useContext } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";

const HomeFooter = () => {
  const { countersState } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const activeCounterData = countersState.counters.find(
    (counter) => counter.isActive,
  );
  return (
    <div className="flex justify-between p-4">
      <p className={`text-${themesState.theme}-400`}>
        Round:{" "}
        {activeCounterData &&
          Math.floor(activeCounterData.count / activeCounterData.lap)}
      </p>
      <p className={`text-${themesState.theme}-400`}>
        Count:{" "}
        {`${activeCounterData && activeCounterData.count % activeCounterData.lap}/${activeCounterData && activeCounterData.lap}`}
      </p>
    </div>
  );
};

export default HomeFooter;
