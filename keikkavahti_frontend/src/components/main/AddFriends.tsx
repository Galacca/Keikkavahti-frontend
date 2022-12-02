import { Center, Button, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Text, VStack } from "@chakra-ui/react"
import React from "react";
import { UserState } from "../../types/User";
import { IsLoggedIn } from "../../utils/UserUtils"


type FriendButtonProps = {
    user: UserState,
    onOpen: () => void
};

interface AddFriendsProps  {
    isOpen: boolean
    onOpen: () => void
    user: UserState
    onClose: () => void
}

const AddFriendButton: React.FC<FriendButtonProps> = ({user, onOpen}) => {
    
    return (
        <Center>
            <Button
            onClick={onOpen}
            mt={4}
            mb={4}
            w={['100px', '110px', '120px']}
            bg={'blue.500'}
            color={'white'}
            rounded={'3xl'}
            _hover={{ bg: 'blue.400', }}
            isDisabled={!IsLoggedIn(user.user.name)}
            >
            Add Friends
            </Button>
        </Center>
    )
}

export const AddFriends: React.FC<AddFriendsProps> = ({user, isOpen, onOpen, onClose}) => {
   
    return (

    <>
        <AddFriendButton user={user} onOpen={onOpen} />

        <Drawer isOpen={isOpen} onClose={onClose} placement={'top'}>
            <DrawerOverlay/>
            <DrawerContent bg='teal.600'>
                <DrawerCloseButton  />
                <Box margin='15px'/>
                <DrawerHeader  textAlign='center'>Enter the name of the friend you want to add</DrawerHeader>
                    <DrawerBody bg='teal.800'>
                        <Center>
                            <VStack>
                                <Text>Note that this is not the username, but the name they provided during sign up</Text>
                                <Input w='240px' autoFocus={true} borderColor={'gray.300'} mr={4} placeholder='Enter name...' />
                                <Button colorScheme='blue'>Add</Button>
                            </VStack>
                        </Center>
                    </DrawerBody>

            </DrawerContent>
        </Drawer>
    </>

    )
   
}