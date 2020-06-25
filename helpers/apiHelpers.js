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

export function getPaginatedRestaurantsFromApi(searchTerm="", page, per_page=8, location) {
    location = {
        lat : 1.2987363, 
        lng : 103.7748976
    }
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/?page=${page}&per_page=${per_page}&q=${searchTerm}&loc=${location}`, requestOptions)
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

export function getPaginatedDishesFromApi(restaurant_id, page, per_page=8) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/${restaurant_id}/dishes?per_page=${per_page}&page=${page}`, requestOptions)
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

    var raw = JSON.stringify(
        {
            "data":
            {
                attributes: {
                    username,
                    password
                }
            }
        });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/sign_up`, requestOptions)
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

export function getProfileData(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/profile`, requestOptions)
        .then(response => response.json())
        .then(response => response.data)
}

export function getReviewsForRestaurant(restaurant_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants/${restaurant_id}/reviews`, requestOptions)
        .then(response => response.json())
        .then(response => response.data)
}

export function getPaginatedReviewsForRestaurant(restaurant_id, page, per_page=8) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants/${restaurant_id}/reviews?per_page=${per_page}&page=${page}`, requestOptions)
        .then(response => response.json())
        .then(response => response.data)
}

export function postReview(review,restaurant_id,token) {
    /*
    {
        "errors": {
            "content": [
                "can't be blank"
            ],
            "rating": [
                "can't be blank"
            ]
        }
    }
    */
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        data: {
            attributes: review
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants/${restaurant_id}/reviews/`, requestOptions)
        .then(response => response.json())
}

export function getUsername(user_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/users/${user_id}`, requestOptions)
        .then(response => response.json())
}

export function deleteRestaurant(restaurant_id, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants/${restaurant_id}`, requestOptions)
        .then(response => response.json())
}
