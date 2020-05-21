/* DOCUMENTATION
    *
    * Sample JSON returned from calling the fetch
    * {
    *   "data":[
    *       {
    *           "id":"1",
    *           "type":"restaurant",
    *           "attributes":
    *               {
    *                   "title":"Jay's toppokki Restaurant",
    *                   "description":"best toppoki in the world",
    *                   "rating":"5"
    *               }
    *       }
    *   ]
    *}
    *
    * each restaurant has
    * - title
    * - description
    * - rating
    *
    * */

const HOST = "https://eats-by-js-api.herokuapp.com/"

export function getRestaurantsFromApi() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants`, requestOptions)
        .then(res => res.json())
        .then(json => json.data)
}

export function getTagsFromApi() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/tags`, requestOptions)
        .then(res => res.json())
        .then(json => json.data)
}
