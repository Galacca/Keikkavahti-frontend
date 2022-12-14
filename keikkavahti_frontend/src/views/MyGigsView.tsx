import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { MyAttendingGigsCard, MyInterestedGigsCard } from "../components/mygigs/MyGigsCard"
import { SimplifiedGig } from "../types/Gigs"
import { MyGigState } from "../types/MyGigs"

interface MyGigsProps  {

    myGigs: MyGigState
   
}

export const MyGigsView: React.FC<MyGigsProps> = ({myGigs}) => {
    
    return (
        <>
        <VStack>
        <Box overflow={'hidden'} w='100%' h='min-content' rounded={'xl'} bg='gray.500' pb={6} pt={3} >

            <Center>
                <Text mb={3} fontWeight={700}>Your gigs</Text>
            </Center>

            <Center>
            <Box h='min-content' mb={6} border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' bgGradient='linear(to-r, yellow.500, yellow.700)'>
                <Text borderBottom={'1px'} ml={3} mb={2} fontWeight={700}>Attending</Text>
                
                {Object.values(myGigs.gigs.attending).map((g: SimplifiedGig) => <MyAttendingGigsCard
                        date={g.date}
                        venue={g.venue}
                        bands={g.bands}
                        id={g.id}
                        key={g.id}
                        status={g.status}
                />)}
                
            </Box>
            </Center>
            
            <Center>
            <Box border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' h='min-content' bgGradient='linear(to-r, teal.500, teal.700)'>
                <Text borderBottom={'1px'} fontWeight='700' mb={2} ml={3}>Interested</Text>
                {Object.values(myGigs.gigs.interested).map((g: SimplifiedGig) => <MyInterestedGigsCard
                        date={g.date}
                        venue={g.venue}
                        bands={g.bands}
                        id={g.id}
                        key={g.id}
                        status={g.status}
                />)}
                
            </Box>
            </Center>

            
            
        </Box>
        </VStack>
        </>
    )
}