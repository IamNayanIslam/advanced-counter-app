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
  isEditing: boolean;
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
      isEditing: false,
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
  const getInitialState = (initialState: ICountersState): ICountersState => {
    const savedData = localStorage.getItem("counterState");

    if (savedData === null) return initialState;

    try {
      return JSON.parse(savedData) as ICountersState;
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      return initialState;
    }
  };
  const [countersState, dispatch] = useReducer(
    CountersReducers,
    INITIAL_COUNTERS_STATE,
    getInitialState,
  );

  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(countersState));
  }, [countersState]);

  const values: IContextValue = { countersState, dispatch };

  return (
    <CountersContext.Provider value={values}>
      {children}
    </CountersContext.Provider>
  );
};
