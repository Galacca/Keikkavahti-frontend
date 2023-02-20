import React from "react";
import { FriendListAction, MyGigAction, UserAction } from "../reducer";

export const logOut = (
  userDispatch: React.Dispatch<UserAction>,
  myGigDispatch: React.Dispatch<MyGigAction>,
  friendListDispatch: React.Dispatch<FriendListAction>
) => {
  window.localStorage.clear();
  userDispatch({
    type: "LOGGED_IN_USER",
    payload: { id: "0", name: "", token: "" },
  });
  myGigDispatch({ type: "EMPTY_MYGIGS_LIST" });
  friendListDispatch({ type: "EMPTY_FRIENDS_LIST" });
};
