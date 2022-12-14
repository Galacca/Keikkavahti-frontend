import { SimplifiedGig } from "./Gigs";

export type MyGigState = {
    gigs: {
    interested: Array<SimplifiedGig>
    attending: Array<SimplifiedGig>
    }
}
