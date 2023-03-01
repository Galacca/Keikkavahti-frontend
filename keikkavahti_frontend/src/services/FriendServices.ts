import { UserState } from "../types/User";
import { devOrProd } from "../utils/UrlUtils";

export const addFriend = async (user: UserState, friendName: string) => {
  const url: string = devOrProd() + "/users/post/addfriend/";

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.user.token,
      },
      body: friendName,
    })
  ).json();
  return response;
};

export const getFriendList = async (user: UserState) => {
  const url: string = devOrProd() + "/friends/get/friendslist/";

  const response = await (
    await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + user.user.token },
    })
  ).json();
  return response;
};

export const getFriendsGigs = async (user: UserState, friendName: string) => {
  const url: string = devOrProd() + "/gigs/post/getTaggedGigs/";

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.user.token,
      },
      body: friendName,
    })
  ).json();
  return response;
};
