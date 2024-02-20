import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import theme from "./Theme";
import {
  FriendListStateProvider,
  GigStateProvider,
  MyGigStateProvider,
  UserStateProvider,
} from "./state";
import {
  friendListReducer,
  gigReducer,
  myGigReducer,
  userReducer,
} from "./reducer";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <GigStateProvider reducer={gigReducer}>
    <UserStateProvider reducer={userReducer}>
      <MyGigStateProvider reducer={myGigReducer}>
        <FriendListStateProvider reducer={friendListReducer}>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </FriendListStateProvider>
      </MyGigStateProvider>
    </UserStateProvider>
  </GigStateProvider>
  // </React.StrictMode>
);
