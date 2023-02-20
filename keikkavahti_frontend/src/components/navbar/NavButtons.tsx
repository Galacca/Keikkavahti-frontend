import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FriendListAction, MyGigAction, UserAction } from "../../reducer";
import { logOut } from "../../services/LogoutService";
import { IsLoggedIn } from "../../utils/UserUtils";

type LoginAndSignUpButtonsProps = {
  user: string;
  userDispatch: React.Dispatch<UserAction>;
  myGigDispatch: React.Dispatch<MyGigAction>;
  friendListDispatch: React.Dispatch<FriendListAction>;
};

export const LogInAndSignUpButtons: React.FC<LoginAndSignUpButtonsProps> = ({
  user,
  userDispatch,
  myGigDispatch,
  friendListDispatch,
}) => {
  if (!IsLoggedIn(user))
    return (
      <>
        <Link to="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="ghost">Sign up</Button>
        </Link>
      </>
    );

  return (
    <>
      <Text color="blue.100" fontSize="2xl">
        {user}
      </Text>
      <Button
        variant="ghost"
        onClick={() => logOut(userDispatch, myGigDispatch, friendListDispatch)}
      >
        Logout
      </Button>
    </>
  );
};

export const LogInAndSignUpButtonsMobile: React.FC<
  LoginAndSignUpButtonsProps
> = ({ user, userDispatch, myGigDispatch, friendListDispatch }) => {
  if (!IsLoggedIn(user))
    return (
      <>
        <Link to="/login">
          <Button textColor="white" variant="outline">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button textColor="white" variant="outline">
            Sign up
          </Button>
        </Link>
      </>
    );

  return (
    <>
      <Text color="gray.100" fontSize="2xl">
        {user}
      </Text>
      <Button
        textColor="white"
        variant="outline"
        onClick={() => logOut(userDispatch, myGigDispatch, friendListDispatch)}
      >
        Logout
      </Button>
    </>
  );
};
