import { UserState } from "../types/User";

export const addFriend = async (user: UserState, friendID: string) => {
    let url: string = "http://localhost:8000/users/post/addfriend/"
    // { "friendToAddId": 1338 }
    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 

    const bodyObject = {
        friendToAddId: friendID
    }

    const response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.user.token}, body: JSON.stringify(bodyObject)});
    const formattedResponse = await response.json()
    return formattedResponse;

}