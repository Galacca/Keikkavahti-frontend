import { UserState } from "../types/User";

export const addFriend = async (user: UserState, friendName: string) => {
    let url: string = "http://localhost:8000/users/post/addfriend/"
    
    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 
    
    const response = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.user.token }, body: friendName })).json()
    return response

}

export const getFriendList = async (user: UserState) => {
    let url: string = "http://localhost:8000/friends/get/friendslist/"
    
    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 
    
    const response = await (await fetch(url, {method: 'GET', headers: {'Authorization': 'Bearer ' + user.user.token}})).json();
    return response

}

export const getFriendsGigs = async (user: UserState, friendName: string) => {
    let url: string = "http://localhost:8000/gigs/post/getTaggedGigs/"

    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 

    const response = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.user.token }, body: friendName })).json();
    return response

}