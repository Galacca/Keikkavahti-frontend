import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/SignUp';
import theme from './Theme'
import { GigStateProvider, UserStateProvider } from './state';
import { gigReducer, userReducer } from './reducer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
  <GigStateProvider reducer={gigReducer}>
  <UserStateProvider reducer={userReducer}>
  <ChakraProvider theme={theme}>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  </ChakraProvider>
  </UserStateProvider>
  </GigStateProvider>
  </React.StrictMode>
  
)
