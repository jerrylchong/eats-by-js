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

export function getRestaurantFromApi(restaurant_id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/${restaurant_id}`, requestOptions)
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

export function getDishesFromApi(restaurant_id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/${restaurant_id}/dishes`, requestOptions)
        .then(res => res.json())
        .then(json => json.data)
}

export function getRestaurantTagsFromApi(restaurant_id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/${restaurant_id}/tags`, requestOptions)
        .then(res => res.json())
        .then(json => json.data)
}

export function postSignUp(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"user":{username,password}});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/sign_up`, requestOptions)
        .then(response => response.json());
}

export function postLogin(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({username, password});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/authenticate`, requestOptions)
        .then(response => response.json());
}
