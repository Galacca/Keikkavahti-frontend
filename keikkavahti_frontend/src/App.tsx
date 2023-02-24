import {
  Box,
  Center,
  Hide,
  Show,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import GigView from "./views/GigView";
import Header from "./components/main/Header";
import { NavBar } from "./components/main/NavBar";
import SearchGigsForm from "./components/forms/SearchGigsForm";
import React from "react";
import { getAllGigs, getTaggedGigs } from "./services/GigServices";
import {
  useFriendListStateValue,
  useGigStateValue,
  useMyGigStateValue,
  useUserStateValue,
} from "./state";
import { AddFriends } from "./components/main/AddFriends";
import { FriendView } from "./views/FriendView";
import { MyGigsView } from "./views/MyGigsView";
import { UserState } from "./types/User";
import { getFriendList } from "./services/FriendServices";
import { FriendWithUnfilteredGigs } from "./types/Friends";

type StoredToken = {
  id: string;
  name: string;
  token: string;
  user: string;
};

const App = () => {
  const [user, userDispatch] = useUserStateValue();
  const [, myGigDispatch] = useMyGigStateValue();
  const [friend, FriendListDispatch] = useFriendListStateValue();

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");

    if (loggedUserJSON) {
      const userFromToken: StoredToken = JSON.parse(loggedUserJSON);

      const userObject = {
        user: {
          id: userFromToken.id,
          name: userFromToken.name,
          token: userFromToken.token,
          user: userFromToken.user,
        },
      };
      userDispatch({ type: "LOGGED_IN_USER", payload: userFromToken });
      if (userFromToken) {
        void fetchMyGigList(userObject);
        fetchMyFriendsList(userObject).then((result) => {
          fetchMyFriendsGigs(userObject, result);
        });
      }
    }
  }, []);

  const fetchMyFriendsList = async (userFromToken: UserState) => {
    try {
      const result = await getFriendList(userFromToken);

      return result;
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchMyFriendsGigs = async (
    userFromToken: UserState,
    result: Array<string>
  ) => {
    try {
      result.map(async (r) => {
        let friendsGigsResult = await getTaggedGigs(userFromToken, r);

        //Make the backend return an empty array instead? Probably a better solution
        if (friendsGigsResult === "User has no tagged gigs")
          friendsGigsResult = [];

        const friendObject: FriendWithUnfilteredGigs = {
          friend: {
            name: r,
            gigs: friendsGigsResult,
          },
        };

        //Stop multiple entries on refresh, we are gonna call a different dispatch for adding a new friend anyway

        if (friend.friendsList.length === 0)
          FriendListDispatch({
            type: "SET_FRIENDS_GIG_DATA",
            payload: friendObject,
          });
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchMyGigList = async (userFromToken: UserState) => {
    try {
      const result = await getTaggedGigs(userFromToken, null);

      if (result !== "User has no tagged gigs")
        myGigDispatch({ type: "SET_MYGIGS_LIST", payload: result });
    } catch (error: any) {
      console.error(error);
    }
  };

  const [, gigDispatch] = useGigStateValue();
  React.useEffect(() => {
    const fetchGigList = async () => {
      try {
        const { results: gigListFromApi } = await getAllGigs();
        gigDispatch({ type: "SET_GIG_LIST", payload: gigListFromApi });
      } catch (error: any) {
        console.error(error);
      }
    };
    void fetchGigList();
  }, [gigDispatch]);

  const [myGigs] = useMyGigStateValue();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="app" bg="gray.700" minH={"calc(100vh)"}>
      <NavBar />
      <Header HeaderBigText={"Keikkavahti"}></Header>
      <AddFriends
        user={user}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></AddFriends>
      <SearchGigsForm />

      <Center>
        <SimpleGrid columns={[1, 1, 3]} spacingX="120px" spacingY="30px">
          <FriendView myFriends={friend} />
          <Show below="md">
            <MyGigsView myGigs={myGigs} />
          </Show>
          <GigView />
          <Hide below="md">
            <MyGigsView myGigs={myGigs} />
          </Hide>
        </SimpleGrid>
      </Center>
    </Box>
  );
}

export default App;
