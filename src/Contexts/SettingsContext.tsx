import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import { SettingsReducer, type ISettingsState, type SettingsAction } from "../Reducers/SettingsReducer";

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

type IProps {
    children: ReactNode;
}

interface IContextValues {
    settingsState: ISettingsState
    dispatch: Dispatch<SettingsAction>
}


export const SettingsContext = createContext<IContextValues>({
  settingsState: INITIAL_SETINGS_STATE,
  dispatch: () => {},
});

export const SettingsContextProvider = ({children}: IProps) => {
  const [settingsState, dispatch ] = useReducer(
    SettingsReducer,
    INITIAL_SETINGS_STATE,
  );


  const values = {settingsState, dispatch}


  return (
  <SettingsContext.Provider value={values}>
        {children}
    </SettingsContext.Provider>
)
  
};
