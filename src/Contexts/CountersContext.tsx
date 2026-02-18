import {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  CountersReducers,
  type CounterAction,
} from "../Reducers/CountersReducer";
import { v4 as uuidv4 } from "uuid";

export interface ICounter {
  name: string;
  count: number;
  id: string;
  isActive: boolean;
  target: number;
  lap: number;
}

export interface ICountersState {
  counters: ICounter[];
}

export interface IContextValue {
  countersState: ICountersState;
  dispatch: Dispatch<CounterAction>;
}

export const INITIAL_COUNTERS_STATE: ICountersState = {
  counters: [
    {
      name: "counter name",
      count: 0,
      id: uuidv4(),
      isActive: true,
      target: 99,
      lap: 33,
    },
  ],
};

export const CountersContext = createContext<IContextValue>({
  countersState: INITIAL_COUNTERS_STATE,
  dispatch: () => {},
});

interface IProps {
  children: ReactNode;
}
export const CountersContextProvider = ({ children }: IProps) => {
  const savedData = localStorage.getItem("counterState");
  const [countersState, dispatch] = useReducer(
    CountersReducers,
    savedData ? JSON.parse(savedData) : INITIAL_COUNTERS_STATE,
  );

  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(countersState));
  });

  const values: IContextValue = { countersState, dispatch };

  return (
    <CountersContext.Provider value={values}>
      {children}
    </CountersContext.Provider>
  );
};
