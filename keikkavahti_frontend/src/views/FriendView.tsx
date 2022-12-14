import { Box, Text, VStack } from "@chakra-ui/react"

export const FriendView: React.FC = () => {
    return (
        <>
        <VStack>
        <Box overflow={'hidden'} w='100%' h='min-content' rounded={'xl'} bg='gray.500' pb={6} pt={3} >

            <VStack>
                <Text fontWeight='700'>Name's activity</Text>
                <Box border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' h='100%' bgGradient='linear(to-r, yellow.500, yellow.700)'>
                    <Text fontWeight='500' ml={4}>Attending:</Text>
                    <Text ml={4}>Keikkajonnemenossa</Text>
                    </Box>
                    <Box border={'1px'} textAlign={'center'} rounded={'xl'} w='90%' h='100%' bgGradient='linear(to-r, teal.500, teal.700)'>
                    <Text fontWeight='500' ml={4}>Interested:</Text>
                    <Text ml={4}>Keikkajokakiinnostaa</Text>
                </Box>
            </VStack>
        </Box>
        </VStack>
        </>
    )
}