import { createContext, useReducer, type Dispatch, type ReactNode } from "react"
import { ThemesReducer, type ThemesAction } from "../Reducers/ThemesReducer";

export interface ITheme {
    theme: "cyan" | "teal" | "violet" | "indigo" | "emerald" | "rose";
}

export interface IContextValue {
    themesState: ITheme;
    dispatch: Dispatch<ThemesAction>;
}

export interface IProps {
    children: ReactNode
}

export const INITIAL_THEMES_STATE: ITheme = {
    theme: "cyan",
}

export const ThemesContext = createContext<IContextValue>({themesState: INITIAL_THEMES_STATE, dispatch: ()=>{}})

export const ThemesContextProvider = ({children}: IProps) =>{
    const [themesState, dispatch] = useReducer(ThemesReducer, INITIAL_THEMES_STATE)

    const values = {themesState, dispatch};

    return (
        <ThemesContext.Provider value={values}>{children}</ThemesContext.Provider>
    )
}