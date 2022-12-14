import { UserState } from "../types/User";

export async function getAllGigs() {
    let url: string = "http://localhost:8000/gigs/get/allgigs"

    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 

    try{
        const response = await fetch(url, {method: 'GET'});
        const formattedResponse = await response.json()
        return formattedResponse;
    }catch(error) {
        console.log(url + " GET failed")
    }
}

export async function getGigsByMonth(monthAndYear: object) {

    let url: string = "http://localhost:8000/gigs/get/bymonth"

    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 

    try{

        const response = await fetch(url, {headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify(monthAndYear), method: 'POST',});
            
        const formattedResponse = await response.json()
        return formattedResponse;

    }catch(error) {
        console.log(url + " POST failed")
    }
}

export async function tagGig(id: string, operation: string, user: UserState) {

    const bodyObject = {
        gigToTagId: id,
        operation: operation
    }

    let url: string = "http://localhost:8000/gigs/post/tagGig/"

    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    } 

    try{

        const response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.user.token}, body: JSON.stringify(bodyObject)})
            
        const formattedResponse = await response.json()
        return formattedResponse;

    }catch(error) {
        console.log(url + " POST failed")
    }

}

export async function getTaggedGigs(user: UserState, friend: string | null) {
    
    let url: string = "http://localhost:8000/gigs/post/getTaggedGigs"
    let requestedFrom: string | null = friend

    if (friend === null) requestedFrom = user.user.name

    if (import.meta.env.PROD) {
        url = "YEAH WE'RE NOT HERE YET"
    }
    
    const bodyObject = {
        name: requestedFrom
    }
    
    try{

        const response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.user.token}, body: JSON.stringify(bodyObject)})
            
        const formattedResponse = await response.json()
        return formattedResponse;

    }catch(error) {
        console.log(url + " POST failed")
    }

}

