import type { ITheme } from "../Contexts/ThemseContext";

export type ThemesAction = | {
    type: "SET_THEME"; payload: "cyan" | "teal" | "violet" | "indigo" | "emerald" | "rose";
}

export const ThemesReducer = (state: ITheme, action: ThemesAction) => {
    switch (action.type) {
        case "SET_THEME":
            return {
                ...state, theme: action.payload
            }
            ;
    
        default:
            return state;
    }
}