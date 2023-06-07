import { MyGigState } from "../../types/MyGigs";

export const conditionalButtonTextAttending = (
  myGigs: MyGigState,
  id: string
): string => {
  const attendingArray = Object.values(myGigs.gigs.attending);
  const isAlreadyAttending = attendingArray.map((g) =>
    g.id.toString().includes(id)
  );
  if (isAlreadyAttending.includes(true))
    return "You are tagged as attending for this gig";

  return "Im attending";
};

export const conditionalButtonTextInterested = (
  myGigs: MyGigState,
  id: string
): string => {
  const interestedArray = Object.values(myGigs.gigs.interested);
  const isAlreadyAttending = interestedArray.map((g) =>
    g.id.toString().includes(id)
  );
  if (isAlreadyAttending.includes(true))
    return "You are tagged as interested for this gig";

  return "Im interested";
};
