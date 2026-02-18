import type { ICounter, ICountersState } from "../Contexts/CountersContext";


export type CounterAction = { type: "ADD_COUNTER"; payload: ICounter } | { type: "INCREMENT_COUNT"; payload: number }

export const CountersReducers = (state: ICountersState, action: CounterAction): ICountersState => {
    const {type, payload} = action;
    switch (type) {
        case "ADD_COUNTER":
            return {
                ...state, counters: [...state.counters, payload]
            }
        case "INCREMENT_COUNT":
            return {
                ...state, counters: state.counters.map((counter)=> counter.id === payload ? {...counter, count: counter.count +1} : counter)
            }

        default:
            return state;
    }
}