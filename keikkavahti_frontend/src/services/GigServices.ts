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

