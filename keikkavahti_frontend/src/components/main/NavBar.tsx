import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
  useFriendListStateValue,
  useMyGigStateValue,
  useUserStateValue,
} from "../../state";
import {
  LogInAndSignUpButtons,
  LogInAndSignUpButtonsMobile,
} from "../navbar/NavButtons";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [user, userDispatch] = useUserStateValue();
  const [, myGigDispatch] = useMyGigStateValue();
  const [, FriendListDispatch] = useFriendListStateValue();

  return (
    <Box as="nav" bgGradient="linear(to-t, teal.700, gray.500)" border="1px">
      <HStack spacing="10" justify="space-between">
        {isDesktop ? (
          <Flex justify="end" flex="1">
            <HStack spacing="3">
              <LogInAndSignUpButtons
                user={user.user.name}
                userDispatch={userDispatch}
                myGigDispatch={myGigDispatch}
                friendListDispatch={FriendListDispatch}
              />
            </HStack>
          </Flex>
        ) : (
          <Flex justify="end" flex="1">
            <IconButton
              onClick={onOpen}
              variant="ghost"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
            />
            <Drawer isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg="teal.600">
                <DrawerCloseButton />
                <Box margin="15px" />
                <DrawerHeader textAlign="center">
                  Choose your destination
                </DrawerHeader>

                <DrawerBody bg="teal.800">
                  <VStack mt="12px" spacing="24px">
                    <LogInAndSignUpButtonsMobile
                      user={user.user.name}
                      userDispatch={userDispatch}
                      myGigDispatch={myGigDispatch}
                      friendListDispatch={FriendListDispatch}
                    />
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        )}
      </HStack>
    </Box>
  );
};
