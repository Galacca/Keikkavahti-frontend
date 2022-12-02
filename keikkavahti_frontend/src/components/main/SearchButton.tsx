import { Button, Center } from "@chakra-ui/react"

const SearchButton = () => {
    
    return (
        <Center>
            <Button
            type="submit"
            mt={4}
            w={'90px'}
            bg={'blue.600'}
            color={'white'}
            rounded={'xl'}
            _hover={{ bg: 'blue.400', }}
            >
            Search
            </Button>
        </Center>
    )
}
    
    export default SearchButton