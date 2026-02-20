import { useContext } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";

const HomeFooter = () => {
  const { countersState } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const activeCounterData = countersState.counters.filter(
    (counter) => counter.isActive,
  )[0];
  return (
    <div className="flex justify-between p-4">
      <p className={`text-${themesState.theme}-400`}>
        Round: {Math.floor(activeCounterData.count / activeCounterData.lap)}
      </p>
      <p className={`text-${themesState.theme}-400`}>
        Counte: {`${activeCounterData.count}/${activeCounterData.target}`}
      </p>
    </div>
  );
};

export default HomeFooter;
