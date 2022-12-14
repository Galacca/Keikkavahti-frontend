import { VStack } from "@chakra-ui/react";
import GigCard from "../components/gigs/GigCard"
import { useGigStateValue, useUserStateValue } from "../state"
import Gig from "../types/Gigs"

const GigView = () => {

    const [{ gigs }] = useGigStateValue();
    const [ user ] = useUserStateValue()

return (
    <>
    <VStack>
         {Object.values(gigs).map((g: Gig) => <GigCard
                link={g.link}
                date={g.date}
                time={g.time}
                venue={g.venue}
                bands={g.bands}
                addinfo={g.addinfo}
                id={g.id}
                key={g.id}
                user={user}
                />)}
    </VStack>
    </>
)
}

export default GigView