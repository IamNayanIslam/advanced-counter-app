import { useContext } from "react";
import { CountersContext } from "../Contexts/CountersContext";
import { ThemesContext } from "../Contexts/ThemseContext";
import { SettingsContext } from "../Contexts/SettingsContext";

const HomeFooter = () => {
  const { countersState } = useContext(CountersContext);
  const { themesState } = useContext(ThemesContext);
  const { settingsState } = useContext(SettingsContext);
  const activeCounterData = countersState.counters.find(
    (counter) => counter.isActive,
  );
  return (
    <div className="flex justify-between p-4">
      <div>
        {settingsState.lapDisplay && (
          <p className={`text-${themesState.theme}-400`}>
            Round:{" "}
            {activeCounterData &&
              Math.floor(activeCounterData.count / activeCounterData.lap)}
          </p>
        )}
      </div>
      <div>
        {settingsState.remainingCountDisplay && (
          <p className={`text-${themesState.theme}-400`}>
            Count:{" "}
            {`${activeCounterData && activeCounterData.count % activeCounterData.lap}/${activeCounterData && activeCounterData.lap}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeFooter;
