export type CounterShape = "circle" | "cubical" | "hexagon";

export interface ISettingsState {
  sound: boolean;
  vibration: boolean;
  minusButton: boolean;
  lapDisplay: boolean;
  remainingCountDisplay: boolean;
  volumeButtonControl: boolean;
  buttonShape: CounterShape;
}

export type SettingsAction =
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
    case "TOGGLE_SOUND":
      return {
        ...state,
        sound: !state.sound,
      };
    case "TOGGLE_LAP_DISPLAY":
      return {
        ...state,
        lapDisplay: !state.lapDisplay,
      };
    case "TOGGLE_REMAINING_COUNT_DISPLAY":
      return {
        ...state,
        remainingCountDisplay: !state.remainingCountDisplay,
      };
    case "TOGGLE_MINUS_BUTTON":
      return {
        ...state,
        minusButton: !state.minusButton,
      };
    case "SET_SHAPE":
      return {
        ...state,
        buttonShape: action.payload,
      };
    case "TOGGLE_VOLUME_BUTTON_CONTROL":
      return {
        ...state,
        volumeButtonControl: !state.volumeButtonControl,
      };

    default:
      return state;
  }
};
