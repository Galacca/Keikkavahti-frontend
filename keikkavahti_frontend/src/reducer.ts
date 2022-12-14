import { Friend, FriendListState } from "./types/Friends";
import Gig, { GigState, SimplifiedGig } from "./types/Gigs";
import { MyGigState } from "./types/MyGigs";
import User, { UserState } from "./types/User"

export type GigAction = {
    type: "SET_GIG_LIST"
    payload: Gig[];
}

export type UserAction = {
    type: "LOGGED_IN_USER"
    payload: User
}

export type MyGigAction = {
    type: "SET_MYGIGS_LIST"
    payload: Array<SimplifiedGig>
}

export type FriendListAction = {
    type: "SET_FRIENDS_LIST_WITHOUT_GIG_DATA"
    payload: Array<string>
}

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
                }
            };
        default:
        return state;
    }
};

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return {
                ...state,
                user: { id: action.payload.id, name: action.payload.name, token: action.payload.token }
            };
            default:
                return state;
    }
}

export const myGigReducer = (state: MyGigState, action: MyGigAction): MyGigState => {
    switch (action.type) {
        case "SET_MYGIGS_LIST":

            const interested: Array<SimplifiedGig> = action.payload.filter(a => a.status === 'interested')
            const attending: Array<SimplifiedGig> = action.payload.filter(a => a.status === 'attending');
            
            return {
                ...state,
                gigs : {
                    ...state.gigs,
                attending : {
                    ...state.gigs.attending, ...attending
                }, interested: {
                    ...state.gigs.interested, ...interested
                }
            }
    }
}
}

export const friendListReducer = (state: FriendListState, action: FriendListAction): FriendListState => {
    switch (action.type) {
        case "SET_FRIENDS_LIST_WITHOUT_GIG_DATA":
            return {
                ...state, friendsList : 
                    action.payload.map(a => {
                       const friendObject: Friend = {
                        friend: {
                        name: a,
                        gigs: {
                            interested: [],
                            attending: []
                        }
                        }
                       }
                       return friendObject
                    })
            };
            default:
                return state;
    }
}