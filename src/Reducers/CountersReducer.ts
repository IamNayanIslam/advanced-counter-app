import type { ICounter, ICountersState } from "../Contexts/CountersContext";

export type CounterAction =
  | { type: "ADD_COUNTER"; payload: ICounter }
  | { type: "INCREMENT_COUNT"; payload: number }
  | { type: "DECREMENT_COUNT" };

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
          counter.isActive === true
            ? {
                ...counter,
                count: counter.count > 0 ? counter.count - 1 : counter.count,
              }
            : counter,
        ),
      };

    default:
      return state;
  }
};
