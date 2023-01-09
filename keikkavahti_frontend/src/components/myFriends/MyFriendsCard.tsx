import { VStack, Box, Text, Center } from "@chakra-ui/react"
import { date } from "zod"
import Gig, { SimplifiedGig } from "../../types/Gigs"
import { isoDateToReadable } from "../../utils/DateUtils"
import { AttendingGigsCard, InterestedGigsCard } from "../myGigs/MyGigsCard"

type MyFriendsCardProps = {
    friendName: string,
    attendingGigs: SimplifiedGig
    interestedGigs: SimplifiedGig

}


//Note that this is not used anywhere. It's just a rough idea of how I want to make the friend view components a bit more organized in the future
export const MyFriendsCard: React.FC<MyFriendsCardProps> = ({friendName, attendingGigs, interestedGigs}) => {
    return (
        <>
            <Box overflow={'hidden'} w='100%' h='min-content' rounded={'xl'} bg='gray.500' pb={6} pt={3} >
                <VStack>
                    <Text fontWeight='700'>{friendName + "'s activity"}</Text>
                    {/* <AttendingGigsCard />
                    <InterestedGigsCard /> */}
                </VStack>
            </Box>
        </>
    )
}
