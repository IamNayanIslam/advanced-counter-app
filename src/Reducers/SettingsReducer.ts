export type CounterShape = "circle" | "cubical" | "hexagon";
export type Language = "bengali" | "english";

export interface ISettingsState {
  sound: boolean;
  vibration: boolean;
  minusButton: boolean;
  lapDisplay: boolean;
  remainingCountDisplay: boolean;
  volumeButtonControl: boolean;
  buttonShape: CounterShape;
  language: Language;
}

export type SettingsAction =
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_SHAPE"; payload: CounterShape }
  | { type: "TOGGLE_SOUND" }
  | { type: "TOGGLE_VIBRATION" }
  | { type: "TOGGLE_MINUS_BUTTON" }
  | { type: "TOGGLE_LAP_DISPLAY" }
  | { type: "TOGGLE_REMAINING_COUNT_DISPLAY" }
  | { type: "TOGGLE_VOLUME_BUTTON_CONTROL" };

export const SettingsReducer = (
  state: ISettingsState,
  action: SettingsAction,
) => {
  switch (action.type) {
    case "TOGGLE_VIBRATION":
      return {
        ...state,
        vibration: !state.vibration,
      };

    default:
      return state;
  }
};
