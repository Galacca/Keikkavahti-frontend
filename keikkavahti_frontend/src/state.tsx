import React, { createContext, useContext, useReducer } from "react";
import { GigState } from "./types/Gigs";
import { GigAction, UserAction } from "./reducer";
import { UserState } from "./types/User";

type GigStateProviderProps = {
    reducer: React.Reducer<GigState, GigAction>;
    children: React.ReactElement;
};

const initialGigState: GigState = {
    gigs: {}
};

export const GigStateContext = createContext<[GigState, React.Dispatch<GigAction>]>([
    initialGigState,
    () => initialGigState
]);

export const GigStateProvider = ({
    reducer,
    children
  }: GigStateProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialGigState);

    return (
      <GigStateContext.Provider value={[state, dispatch]}>
        {children}
      </GigStateContext.Provider>
    );
    
};

type UserStateProviderProps = {
  reducer: React.Reducer<UserState, UserAction>
  children: React.ReactElement;
}

const initialUserState: UserState = {
  user: {id: "0", name: "", token: "" }
};

export const UserStateContext = createContext<[UserState, React.Dispatch<UserAction>]>([
  initialUserState,
  () => initialUserState
])

export const UserStateProvider = ({
  reducer,
  children
}: UserStateProviderProps) => {

  const [state, dispatch] = useReducer(reducer, initialUserState)

  return <UserStateContext.Provider value ={[state, dispatch]}>
      {children}
    </UserStateContext.Provider>

}


export const useGigStateValue = () => useContext(GigStateContext);
export const useUserStateValue = () => useContext(UserStateContext);