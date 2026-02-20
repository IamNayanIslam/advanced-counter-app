import type { ICounter, ICountersState } from "../Contexts/CountersContext";

export type CounterAction =
  | { type: "ADD_COUNTER"; payload: ICounter }
  | { type: "INCREMENT_COUNT"; payload: string }
  | { type: "DECREMENT_COUNT" }
  | { type: "RESET_COUNT" }
  | { type: "TOGGLE_IS_ACTIVE"; payload: string }
  | { type: "DELETE_COUNTER"; payload: string }
  | { type: "SET_COUNTER_TO_BE_UPDATED_ID"; payload: string }
  | { type: "UPDATE_COUNTER"; payload: ICounter };

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
          counter.id === action.payload
            ? { ...counter, isActive: true }
            : { ...counter, isActive: false },
        ),
      };

    case "DELETE_COUNTER": {
      const idToDelete = action.payload; //jei counter delete hbe tar id

      const updatedCounters = state.counters.filter(
        (counter) => counter.id !== idToDelete,
      ); //delete korar por jei counters gula thakbe tar list

      const deletedCounter = state.counters.find((c) => c.id === idToDelete); //jei counter delete korbo oita pabo aikhane
      const wasActive = deletedCounter ? deletedCounter.isActive : false; //aikhane check korbo jeita delete korsi oitar isActive true ki na

      if (wasActive && updatedCounters.length > 0) {
        updatedCounters[0] = { ...updatedCounters[0], isActive: true }; //active ta jodi true hoi taile array te thaka prothom counter ta ke active kore dibo jehetu active ta delete hoye gese
      }

      return {
        ...state,
        counters: updatedCounters, //finaly delete korar por je counters gula ache oi gula countesr array te diye dibo
      };
    }

    case "SET_COUNTER_TO_BE_UPDATED_ID":
      return {
        ...state,
        counterToBeUpdatedId: action.payload,
      };

    case "UPDATE_COUNTER":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter.id === state.counterToBeUpdatedId ? action.payload : counter,
        ),
      };

    default:
      return state;
  }
};
