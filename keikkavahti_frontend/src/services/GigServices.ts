import { UserState } from "../types/User";

export const getAllGigs = async () => {
  let url: string = "http://localhost:8000/gigs/get/allgigs";

  if (import.meta.env.PROD) {
    url = "https://keikkavahti-basicbalancer-242462467.eu-north-1.elb.amazonaws.com/gigs/get/allgigs/";
  }

  try {
    const response = await (await fetch(url, { method: "GET" })).json();
    return response;
  } catch (error) {
    console.log(url + " GET failed");
  }
}

export const getGigsByMonth = async (monthAndYear: object) => {
  let url: string = "http://localhost:8000/gigs/get/bymonth";

  if (import.meta.env.PROD) {
    url = "https://keikkavahtibackend-env.eba-gbx8gbvm.eu-north-1.elasticbeanstalk.com/gigs/get/bymonth";
  }

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
}

export const tagGig = async (id: string, operation: string, user: UserState) => {
  const bodyObject = {
    gigToTagId: id,
    operation: operation,
  };

  let url: string = "http://localhost:8000/gigs/post/tagGig/";

  if (import.meta.env.PROD) {
    url = "https://keikkavahtibackend-env.eba-gbx8gbvm.eu-north-1.elasticbeanstalk.com/gigs/post/tagGig/";
  }

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
}

export const getTaggedGigs = async (user: UserState, friend: string | null) => {
  let url: string = "http://localhost:8000/gigs/post/getTaggedGigs";
  let requestedFrom: string | null = friend;

  if (friend === null) requestedFrom = user.user.name;

  if (import.meta.env.PROD) {
    url = "https://keikkavahtibackend-env.eba-gbx8gbvm.eu-north-1.elasticbeanstalk.com/gigs/post/getTaggedGigs";
  }

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
}

export const deleteTag = async (user: UserState, id: string) => {
  const bodyObject = {
    gigToDeleteId: id,
  };

  let url: string = "http://localhost:8000/gigs/delete/tagGig";

  if (import.meta.env.PROD) {
    url = "https://keikkavahtibackend-env.eba-gbx8gbvm.eu-north-1.elasticbeanstalk.com/gigs/delete/tagGig";
  }

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
