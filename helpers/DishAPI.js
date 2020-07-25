// --------------------------
//
// Dish APIs
//
// --------------------------
//
const HOST = "https://eats-by-js-api.herokuapp.com/"

export function createDish(dish, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        data: {
            attributes: dish
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/dishes`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}
export function updateDish(id, token, data) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = {
        data: {
            id: id,
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

    return fetch(`${HOST}/restaurant_requests/${id}`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}
export function deleteDish(id, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/dishes/${id}`, requestOptions)
        .then(response => response.json())
}
