import { UserState } from "../types/User";
import { devOrProd } from "../utils/UrlUtils";

export const getAllGigs = async () => {
  const url: string = devOrProd() + "/gigs/get/allgigs";

  try {
    const response = await (await fetch(url, { method: "GET" })).json();
    return response;
  } catch (error) {
    console.log(url + " GET failed");
  }
};

export const getGigsByMonth = async (monthAndYear: object) => {
  const url: string = devOrProd() + "/gigs/get/bymonth";

  try {
    const response = await (
      await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(monthAndYear),
        method: "POST",
      })
    ).json();

    return response;
  } catch (error) {
    console.log(url + " POST failed");
  }
};

export const tagGig = async (
  id: string,
  operation: string,
  user: UserState
) => {
  const bodyObject = {
    gigToTagId: id,
    operation: operation,
  };

  const url: string = devOrProd() + "/gigs/post/tagGig/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.user.token,
      },
      body: JSON.stringify(bodyObject),
    });

    //No need to JSON this. All we need is the status code. The state "mimics" the database changes
    //const responseJSON = await response.json();

    return response;
  } catch (error) {
    console.log(url + " POST failed");
  }
};

export const getTaggedGigs = async (user: UserState, friend: string | null) => {
  const url: string = devOrProd() + "/gigs/post/getTaggedGigs";
  let requestedFrom: string | null = friend;

  if (friend === null) requestedFrom = user.user.name;

  const bodyObject = {
    name: requestedFrom,
  };

  try {
    const response = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.user.token,
        },
        body: JSON.stringify(bodyObject),
      })
    ).json();
    return response;
  } catch (error) {
    console.log(url + " POST failed");
  }
};

export const deleteTag = async (user: UserState, id: string) => {
  const bodyObject = {
    gigToDeleteId: id,
  };

  const url: string = devOrProd() + "/gigs/delete/tagGig";

  try {
    //Dont JSON the response as we only really need the status code and json strips it
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.user.token,
      },
      body: JSON.stringify(bodyObject),
    });
    return response;
  } catch (error) {
    console.log(url + " DELETE failed");
  }
};
