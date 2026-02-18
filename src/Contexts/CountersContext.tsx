import {
  createContext,
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
  conunterToBeUpdatedID: number;
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
  conunterToBeUpdatedID: 0,
};

export const CountersContext = createContext<IContextValue>({
  countersState: INITIAL_COUNTERS_STATE,
  dispatch: () => {},
});

interface IProps {
  children: ReactNode;
}
export const CountersContextProvider = ({ children }: IProps) => {
  const [countersState, dispatch] = useReducer(
    CountersReducers,
    INITIAL_COUNTERS_STATE,
  );

  const values: IContextValue = { countersState, dispatch };

  return (
    <CountersContext.Provider value={values}>
      {children}
    </CountersContext.Provider>
  );
};
