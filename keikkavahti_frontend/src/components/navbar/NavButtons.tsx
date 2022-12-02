import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserAction } from "../../reducer";
import { logOut } from "../../services/Logout";
import { IsLoggedIn } from "../../utils/UserUtils";

type Props = {
    user: string,
    dispatch: React.Dispatch<UserAction>
};

export const LogInAndSignUpButtons: React.FC<Props> = ({user, dispatch}) => {

    if (!IsLoggedIn(user))
    return (
        <>
            <Link to='/login'><Button variant="ghost">Login</Button></Link>
            <Link to='/signup'><Button variant="ghost">Sign up</Button></Link>
        </>
    )

    return (
        <>
            <Text color='blue.100' fontSize='2xl'>{user}</Text>
            <Button variant="ghost" onClick={() => logOut(dispatch)}>Logout</Button>
            
        </>
    )

}

export const LogInAndSignUpButtonsMobile: React.FC<Props> = ({user, dispatch}) => {

    if (!IsLoggedIn(user))
    return (
        <>
            <Link to='/login'><Button textColor='white' variant="outline">Login</Button></Link> 
            <Link to='/signup'><Button textColor='white' variant="outline">Sign up</Button></Link> 
        </>
    )

    return (
        <>
            <Text color='gray.100' fontSize='2xl'>{user}</Text>
            <Button textColor='white' variant="outline" onClick={() => logOut(dispatch)}>Logout</Button>
        </>
    )

}