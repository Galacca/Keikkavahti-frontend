import { MyGigState } from "../types/MyGigs";

export const IsLoggedIn = (user: string) => {
  if (user === "") return false;
  return true;
};

export const isAttendingOrInterested = (
  myGigs: MyGigState,
  id: string,
  operation: string
): boolean => {
  const attendingArray = Object.values(myGigs.gigs.attending);
  const interestedArray = Object.values(myGigs.gigs.interested);
  const isAlreadyAttending = attendingArray.map((g) =>
    g.id.toString().includes(id)
  );
  const isAlreadyInterested = interestedArray.map((g) =>
    g.id.toString().includes(id)
  );
  if (
    (isAlreadyAttending.includes(true) && operation === "attending") ||
    (isAlreadyInterested.includes(true) && operation === "interested")
  )
    return true;

  return false;
};

export const isUntaggable = (myGigs: MyGigState, id: string): string => {
  const attendingArray = Object.values(myGigs.gigs.attending);
  const interestedArray = Object.values(myGigs.gigs.interested);
  const isAlreadyAttending = attendingArray.map((g) =>
    g.id.toString().includes(id)
  );
  const isAlreadyInterested = interestedArray.map((g) =>
    g.id.toString().includes(id)
  );

  if (isAlreadyAttending.includes(true) || isAlreadyInterested.includes(true))
    return "block";

  return "none";
};
