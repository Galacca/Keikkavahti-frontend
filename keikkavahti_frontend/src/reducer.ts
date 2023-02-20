import {
  Friend,
  FriendListState,
  FriendWithUnfilteredGigs,
} from "./types/Friends";
import Gig, { GigState, SimplifiedGig } from "./types/Gigs";
import { MyGigState } from "./types/MyGigs";
import User, { UserState } from "./types/User";

export type GigAction = {
  type: "SET_GIG_LIST";
  payload: Gig[];
};

export type UserAction = {
  type: "LOGGED_IN_USER";
  payload: User;
};

export type MyGigAction =
  | {
      type: "SET_MYGIGS_LIST";
      payload: Array<SimplifiedGig>;
    }
  | {
      type: "UNTAG_GIG";
      payload: string;
    }
  | {
      type: "EMPTY_MYGIGS_LIST";
    }
  | {
      type: "TAG_ATTENDING";
      payload: SimplifiedGig;
    }
  | {
      type: "TAG_INTERESTED";
      payload: SimplifiedGig;
    };

export type FriendListAction =
  | {
      type: "SET_FRIENDS_LIST_WITHOUT_GIG_DATA";
      payload: Array<string>;
    }
  | {
      type: "SET_FRIENDS_GIG_DATA";
      payload: FriendWithUnfilteredGigs;
    }
  | {
      type: "EMPTY_FRIENDS_LIST";
    };

export const gigReducer = (state: GigState, action: GigAction): GigState => {
  switch (action.type) {
    case "SET_GIG_LIST":
      return {
        ...state,
        gigs: {
          ...action.payload.reduce(
            (memo, gig) => ({ ...memo, [gig.date]: gig }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
        },
      };
    default:
      return state;
  }
};

export const myGigReducer = (
  state: MyGigState,
  action: MyGigAction
): MyGigState => {
  switch (action.type) {
    case "SET_MYGIGS_LIST":
      const interested: Array<SimplifiedGig> = action.payload.filter(
        (a) => a.status === "interested"
      );
      const attending: Array<SimplifiedGig> = action.payload.filter(
        (a) => a.status === "attending"
      );

      //Set these absolutely without regard for previous state since the backend responds with the full data no matter what action is taken
      return {
        ...state,
        gigs: {
          ...state.gigs,
          attending: {
            ...attending,
          },
          interested: {
            ...interested,
          },
        },
      };
    case "UNTAG_GIG":
      const attendingArray = Object.values(state.gigs.attending);
      const interestedArray = Object.values(state.gigs.interested);
      const untagInterested: Array<SimplifiedGig> = interestedArray.filter(
        (g) => g.id !== action.payload
      );
      const untagAttending: Array<SimplifiedGig> = attendingArray.filter(
        (g) => g.id !== action.payload
      );

      return {
        ...state,
        gigs: {
          ...state.gigs,
          attending: {
            ...untagAttending,
          },
          interested: {
            ...untagInterested,
          },
        },
      };
    case "EMPTY_MYGIGS_LIST":
      return {
        gigs: {
          attending: {
            ...[],
          },
          interested: {
            ...[],
          },
        },
      };
    case "TAG_ATTENDING":
      const tagAttendingAttendingArray = Object.values(state.gigs.attending);
      const tagAttendingUntagFromInterested: Array<SimplifiedGig> =
        tagAttendingAttendingArray.filter((g) => g.id !== action.payload.id);

      return {
        gigs: {
          attending: {
            ...state.gigs.attending,
            ...[action.payload],
          },
          interested: {
            ...tagAttendingUntagFromInterested,
          },
        },
      };
    case "TAG_INTERESTED":
      const tagInterestedAttendingArray = Object.values(state.gigs.attending);
      const tagInterestedUntagFromAttending: Array<SimplifiedGig> =
        tagInterestedAttendingArray.filter((g) => g.id !== action.payload.id);

      return {
        gigs: {
          attending: {
            ...tagInterestedUntagFromAttending,
          },
          interested: {
            ...state.gigs.interested,
            ...[action.payload],
          },
        },
      };
  }
};

export const friendListReducer = (
  state: FriendListState,
  action: FriendListAction
): FriendListState => {
  switch (action.type) {
    case "SET_FRIENDS_LIST_WITHOUT_GIG_DATA":
      return {
        ...state,
        friendsList: action.payload.map((a) => {
          const friendObject: Friend = {
            friend: {
              name: a,
              gigs: {
                interested: [],
                attending: [],
              },
            },
          };
          return friendObject;
        }),
      };
    case "SET_FRIENDS_GIG_DATA":
      const interested: Array<SimplifiedGig> =
        action.payload.friend.gigs.filter((a) => a.status === "interested");
      const attending: Array<SimplifiedGig> = action.payload.friend.gigs.filter(
        (a) => a.status === "attending"
      );

      const friendObject: Friend = {
        friend: {
          name: action.payload.friend.name,
          gigs: {
            interested: interested,
            attending: attending,
          },
        },
      };

      return {
        ...state,
        friendsList: [...state.friendsList, ...[friendObject]],
      };
    default:
      return state;

    case "EMPTY_FRIENDS_LIST":
      return {
        friendsList: [],
      };
  }
};
