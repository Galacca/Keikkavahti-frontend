import {
  Center,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FriendListAction } from "../../reducer";
import { addFriend } from "../../services/FriendServices";
import { getTaggedGigs } from "../../services/GigServices";
import { UserState } from "../../types/User";
import { generateFriendObject } from "../../utils/FriendUtils";
import { IsLoggedIn } from "../../utils/UserUtils";

//Slight props drill here with a depth of 2...Still not sure if it's worth using context for...
type FriendButtonProps = {
  user: UserState;
  onOpen: () => void;
};

interface AddFriendsProps {
  isOpen: boolean;
  onOpen: () => void;
  user: UserState;
  onClose: () => void;
  friendListDispatch: React.Dispatch<FriendListAction>;
}

const initialValues = {
  friendToAddName: "",
};

type AddFriendInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const AddFriendInputField: React.FC<AddFriendInputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Center>
        <VStack>
          <Field
            autoFocus={true}
            w={"240px"}
            as={Input}
            name={field.name}
            variant="filled"
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </VStack>
      </Center>
    </FormControl>
  );
};

const AddFriendButton: React.FC<FriendButtonProps> = ({ user, onOpen }) => {
  return (
    <Center>
      <Button
        onClick={onOpen}
        mt={4}
        mb={4}
        w={["100px", "110px", "120px"]}
        bg={"blue.500"}
        color={"white"}
        rounded={"3xl"}
        _hover={{ bg: "blue.400" }}
        isDisabled={!IsLoggedIn(user.user.name)}
      >
        Add Friends
      </Button>
    </Center>
  );
};

type FriendFormProps = {
  user: UserState;
  friendListDispatch: React.Dispatch<FriendListAction>;
  onClose: () => void;
};

const FriendForm: React.FC<FriendFormProps> = ({
  user,
  friendListDispatch,
  onClose,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const valuesAsJSON = JSON.stringify(values);
          const addFriendResult = await addFriend(user, valuesAsJSON);

          if (addFriendResult?.field) {
            const failedFriendAdd: Record<string, string> = {
              [addFriendResult.field]: addFriendResult.message,
            };
            setErrors(failedFriendAdd);
          } else {
            let addedFriendsGigs = await getTaggedGigs(
              user,
              values.friendToAddName
            );

            if (addedFriendsGigs === "User has no tagged gigs")
              addedFriendsGigs = [];

            const friendObject = generateFriendObject(
              values.friendToAddName,
              addedFriendsGigs
            );

            //Lacking any sort of user feedback if the operation was a success.
            friendListDispatch({
              type: "SET_FRIENDS_GIG_DATA",
              payload: friendObject,
            });

            onClose();
          }
        }}
      >
        <Form>
          <AddFriendInputField
            width="240px"
            autoFocus={true}
            border-color={"gray.300"}
            margin-right={4}
            placeholder="Enter name..."
            name="friendToAddName"
            label="Note that this is not the username, but the name they provided during sign up"
          />
          <Center>
            <Button mt={4} type="submit" colorScheme="blue">
              Add
            </Button>
          </Center>
        </Form>
      </Formik>
    </>
  );
};

export const AddFriends: React.FC<AddFriendsProps> = ({
  user,
  isOpen,
  onOpen,
  onClose,
  friendListDispatch,
}) => {
  return (
    <>
      <AddFriendButton user={user} onOpen={onOpen} />

      <Drawer isOpen={isOpen} onClose={onClose} placement={"top"}>
        <DrawerOverlay />
        <DrawerContent bg="teal.600">
          <DrawerCloseButton />
          <Box margin="15px" />
          <DrawerHeader textAlign="center">
            Enter the name of the friend you want to add
          </DrawerHeader>
          <DrawerBody bg="teal.800">
            <VStack>
              <FriendForm
                user={user}
                friendListDispatch={friendListDispatch}
                onClose={onClose}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
