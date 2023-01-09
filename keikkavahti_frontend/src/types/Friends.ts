import { SimplifiedGig } from "./Gigs"

export type Friend = {

    friend : {
        name: string
        gigs: {
            interested: Array<SimplifiedGig>
            attending: Array<SimplifiedGig>
        }
    }
}

export type FriendListState = {

    friendsList: Array<Friend>
    
}

export type FriendWithUnfilteredGigs = {

    friend: {
        name: string
        gigs: Array<SimplifiedGig>
    }
}