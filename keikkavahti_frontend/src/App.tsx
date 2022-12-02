import { Box, useDisclosure } from '@chakra-ui/react'
import GigView from './views/GigView'
import Header from './components/main/Header'
import { NavBar } from './components/main/NavBar'
import SearchGigsForm from './components/forms/SearchGigsForm'
import React from 'react'
import { getAllGigs } from './services/GigServices'
import { useGigStateValue, useUserStateValue } from './state'
import { AddFriends } from './components/main/AddFriends'


function App() {

const [user, userDispatch] = useUserStateValue();
const { isOpen, onOpen, onClose } = useDisclosure()

React.useEffect(() => {

const loggedUserJSON = window.localStorage.getItem('loggedInUser')

if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  userDispatch({ type: "LOGGED_IN_USER", payload: user})
}
  
}, []);

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

  return (
    
      <Box className="app" bg='gray.700' minH={'calc(100vh)'} h='100%'>
        <NavBar />
        <Header HeaderBigText={'Keikkavahti'}></Header>
        <AddFriends user={user} isOpen={isOpen} onOpen={onOpen} onClose={onClose}></AddFriends>
        <SearchGigsForm />
        <GigView />
      </Box>
    
  )
}

export default App
