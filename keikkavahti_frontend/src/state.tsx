import React, { createContext, useContext, useReducer } from "react";
import { GigState } from "./types/Gigs";
import { FriendListAction, GigAction, MyGigAction, UserAction } from "./reducer";
import { UserState } from "./types/User";
import { MyGigState } from "./types/MyGigs";
import { FriendListState } from "./types/Friends";

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

type MyGigStateProviderProps = {
  reducer: React.Reducer<MyGigState, MyGigAction>;
  children: React.ReactElement;
};

const initialMyGigState: MyGigState = {
  gigs: {
  interested: [],
  attending: []
  }
  
};

export const MyGigStateContext = createContext<[MyGigState, React.Dispatch<MyGigAction>]>([
  initialMyGigState,
  () => initialMyGigState
]);

export const MyGigStateProvider = ({
  reducer,
  children
}: MyGigStateProviderProps) => {

  const [state, dispatch] = useReducer(reducer, initialMyGigState);

  return (
    <MyGigStateContext.Provider value={[state, dispatch]}>
      {children}
    </MyGigStateContext.Provider>
  );
  
};

type FriendListStateProviderProps = {
  reducer: React.Reducer<FriendListState, FriendListAction>;
  children: React.ReactElement;
};

const initialFriendListState: FriendListState = {
  friendsList: []
};

export const FriendListStateContext = createContext<[FriendListState, React.Dispatch<FriendListAction>]>([
  initialFriendListState,
  () => initialFriendListState
]);

export const FriendListStateProvider = ({
  reducer,
  children
}: FriendListStateProviderProps) => {

  const [state, dispatch] = useReducer(reducer, initialFriendListState);

  return (
    <FriendListStateContext.Provider value={[state, dispatch]}>
      {children}
    </FriendListStateContext.Provider>
  );
  
};






export const useGigStateValue = () => useContext(GigStateContext);
export const useUserStateValue = () => useContext(UserStateContext);
export const useMyGigStateValue = () => useContext(MyGigStateContext);
export const useFriendListStateValue = () => useContext(FriendListStateContext);