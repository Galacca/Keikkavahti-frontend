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
}

export default Gig