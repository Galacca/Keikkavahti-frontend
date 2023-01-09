import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { MyFriendsCard } from "../components/myFriends/MyFriendsCard"
import { AttendingGigsCard, InterestedGigsCard } from "../components/myGigs/MyGigsCard"
import { FriendListState } from "../types/Friends"
import { SimplifiedGig } from "../types/Gigs"

interface MyFriendsProps  {

    myFriends: FriendListState
   
}

export const FriendView: React.FC<MyFriendsProps> = ({myFriends}) => {

    if (myFriends.friendsList.length === 0) {
        return (
            <>
            <Box overflow={'hidden'} w='100%' h='min-content' rounded={'xl'} bg='gray.500' pb={6} pt={3} >
                <Center>
                <Text fontWeight={500}>Your friends list is currently empty</Text>
                </Center>
            </Box>
            </>
        )
    }
    
    //Well this got more than a little messy, guess what I get for such a complex state
    return (
        <>
        <VStack>
        <Box overflow={'hidden'} w='100%' h='min-content' rounded={'xl'} bg='gray.500' pb={6} pt={3} >

            {myFriends.friendsList.map(f =>
            <>

            <Center>
                <Text mb={3} fontWeight={700}>{f.friend.name + "'s activity"}</Text>
            </Center>

            <Center>
                <Box h='min-content' mb={6} border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' bgGradient='linear(to-r, yellow.500, yellow.700)'>
                    <Text borderBottom={'1px'} ml={3} mb={2} fontWeight={700}>Attending</Text>
                        {f.friend.gigs.attending.map((a: SimplifiedGig) => <AttendingGigsCard
                            id={a.id}
                            date={a.date}
                            bands={a.bands}
                            venue={a.venue}
                            status={a.status}
                        />)}
                </Box>
            </Center>

            <Center>
                <Box mb={3} border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' h='min-content' bgGradient='linear(to-r, teal.500, teal.700)'>
                    <Text marginEnd={3} borderBottom={'1px'} fontWeight='700' mb={2} ml={3}>Interested</Text>
                        {f.friend.gigs.interested.map((a: SimplifiedGig) => <InterestedGigsCard
                        id={a.id}
                        date={a.date}
                        bands={a.bands}
                        venue={a.venue}
                        status={a.status}
                        />)}
                </Box>
            </Center>
            </>
            )}
           
             
             
            
        </Box>
        </VStack>
        </>
    )
}