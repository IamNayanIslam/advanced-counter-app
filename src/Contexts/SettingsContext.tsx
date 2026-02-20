import {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  SettingsReducer,
  type ISettingsState,
  type SettingsAction,
} from "../Reducers/SettingsReducer";

const INITIAL_SETINGS_STATE: ISettingsState = {
  sound: true,
  vibration: true,
  minusButton: true,
  lapDisplay: true,
  remainingCountDisplay: true,
  volumeButtonControl: false,
  buttonShape: "circle",
  language: "english",
};

type IProps = {
  children: ReactNode;
};

interface IContextValues {
  settingsState: ISettingsState;
  settingsDispatch: Dispatch<SettingsAction>;
}

export const SettingsContext = createContext<IContextValues>({
  settingsState: INITIAL_SETINGS_STATE,
  settingsDispatch: () => {},
});

export const SettingsContextProvider = ({ children }: IProps) => {
  const getInitialState = (initialState: ISettingsState) => {
    const savedSettings = localStorage.getItem("settingsState");

    if (savedSettings === null) return initialState;
    try {
      return JSON.parse(savedSettings) as ISettingsState;
    } catch (error) {
      console.error("Failed to get saved settings:", error);
      return initialState;
    }
  };

  const [settingsState, settingsDispatch] = useReducer(
    SettingsReducer,
    INITIAL_SETINGS_STATE,
    getInitialState,
  );

  const values = { settingsState, settingsDispatch };

  useEffect(() => {
    localStorage.setItem("settingsState", JSON.stringify(settingsState));
  });

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
