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
    return fetch(`${HOST}/restaurants/?per_page=100`, requestOptions)
        .then(res => res.json())
        .then(json => json.data)
}


export function getPaginatedRestaurantsFromApi(searchTerm="", page, tags=[], sort_by=0, location={lat: null, lng: null}, per_page=8) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var tag_ids = tags.map(x => x.id);
    tag_ids = JSON.stringify(tag_ids);
    const lat = location["lat"] ? location["lat"] : ""
    const lng = location["lng"] ? location["lng"] : ""

    var sort_query = ""

    switch(sort_by) {
        case 0: // No have
            sort_query = ""
            break;
        case 1: // Price
            sort_query = "price::integer ASC"
            break;
        case 2: // Rating
            sort_query = "rating ASC"
            break;
        default:
            sort_query = ""
    }
    

    return fetch(`${HOST}/restaurants/?page=${page}&per_page=${per_page}&q=${searchTerm}&lat=${lat}&lng=${lng}&tags_id=${tag_ids}&sort_by=${sort_query}`, requestOptions)
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

export function getNumberOfReviewsFromApi(restaurant_id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`${HOST}/restaurants/${restaurant_id}`, requestOptions)
        .then(res => res.json())
        .then(json => json.data.relationships.reviews.data.length.toString())
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

export function updateRestaurant(restaurant_id, token, data) {

    /*
    const raw = {"data":{"title":"testing"}};
    */

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = {
        data: {
            id: restaurant_id,
            type: "restaurant",
            attributes: data
        }
    }

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants/${restaurant_id}`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}

export function createRestaurant(restaurant, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        data: {
            attributes: restaurant
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/restaurants`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}
