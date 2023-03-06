import { FriendWithUnfilteredGigs } from "../types/Friends";
import { SimplifiedGig } from "../types/Gigs";

export const generateFriendObject = (
  friendName: string,
  gigData: SimplifiedGig[]
): FriendWithUnfilteredGigs => {
  const friendObject: FriendWithUnfilteredGigs = {
    friend: {
      name: friendName,
      gigs: gigData,
    },
  };

  return friendObject;
};
