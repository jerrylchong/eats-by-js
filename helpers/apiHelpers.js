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
export function getRestaurantsFromApi() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("https://eats-by-js-api.herokuapp.com//restaurants", requestOptions)
        .then(res => res.json())
        .then(json => json.data)
        .then(data => data.map( x => x.attributes));
}
