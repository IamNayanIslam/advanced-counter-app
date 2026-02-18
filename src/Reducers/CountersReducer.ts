import type { ICounter, ICountersState } from "../Contexts/CountersContext";

export type CounterAction =
  | { type: "ADD_COUNTER"; payload: ICounter }
  | { type: "INCREMENT_COUNT"; payload: string }
  | { type: "DECREMENT_COUNT" }
  | { type: "RESET_COUNT" }
  | { type: "TOGGLE_IS_ACTIVE"; payload: string };

export const CountersReducers = (
  state: ICountersState,
  action: CounterAction,
): ICountersState => {
  switch (action.type) {
    case "ADD_COUNTER":
      return {
        ...state,
        counters: [...state.counters, action.payload],
      };
    case "INCREMENT_COUNT":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter.id === action.payload
            ? { ...counter, count: counter.count + 1 }
            : counter,
        ),
      };

    case "DECREMENT_COUNT":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter.isActive
            ? {
                ...counter,
                count: counter.count > 0 ? counter.count - 1 : counter.count,
              }
            : counter,
        ),
      };
    case "RESET_COUNT":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter.isActive
            ? { ...counter, count: counter.count > 0 ? 0 : counter.count }
            : counter,
        ),
      };

    case "TOGGLE_IS_ACTIVE":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter.id !== action.payload
            ? { ...counter, isActive: false }
            : counter,
        ),
      };

    default:
      return state;
  }
};
