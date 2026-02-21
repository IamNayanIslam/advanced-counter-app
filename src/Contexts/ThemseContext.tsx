import {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { ThemesReducer, type ThemesAction } from "../Reducers/ThemesReducer";

export interface ITheme {
  theme: "cyan" | "teal" | "violet" | "indigo" | "emerald" | "rose";
}

export interface IContextValue {
  themesState: ITheme;
  dispatch: Dispatch<ThemesAction>;
}

export interface IProps {
  children: ReactNode;
}

export const INITIAL_THEMES_STATE: ITheme = {
  theme: "cyan-400",
};

export const ThemesContext = createContext<IContextValue>({
  themesState: INITIAL_THEMES_STATE,
  dispatch: () => {},
});

export const ThemesContextProvider = ({ children }: IProps) => {
  const getInitialTheme = (initialState: ITheme): ITheme => {
    const savedTheme = localStorage.getItem("themeState");

    if (savedTheme === null) return initialState;

    try {
      return JSON.parse(savedTheme) as ITheme;
    } catch (error) {
      console.error("Failed to load local storage data:", error);
      return initialState;
    }
  };

  const [themesState, dispatch] = useReducer(
    ThemesReducer,
    INITIAL_THEMES_STATE,
    getInitialTheme,
  );

  const values = { themesState, dispatch };
  useEffect(() => {
    localStorage.setItem("themeState", JSON.stringify(themesState));
  });
  return (
    <ThemesContext.Provider value={values}>{children}</ThemesContext.Provider>
  );
};
