import Gig, { GigState } from "./types/Gigs";
import User, { UserState } from "./types/User"

export type GigAction = {
    type: "SET_GIG_LIST";
    payload: Gig[];
}

export type UserAction = {
    type: "LOGGED_IN_USER"
    payload: User
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