import { UserAction } from "../reducer"

export const logOut = (userDispatch: React.Dispatch<UserAction>) => {
    window.localStorage.clear()
    userDispatch({ type: "LOGGED_IN_USER", payload: {id: "0", name: "", token: ""} })
}