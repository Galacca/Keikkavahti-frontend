import { UserState } from "./User";

export type GigState = {
    gigs: { [id: string]: Gig };
};

type Gig = {
    id: string,
    link: string,
    date: string,
    time: string,
    venue: string,
    bands: string,
    addinfo: string,
    user: UserState
}

export type SimplifiedGig = {
    id: string
    date: string
    venue: string
    bands: string
    status: string
}

export default Gig