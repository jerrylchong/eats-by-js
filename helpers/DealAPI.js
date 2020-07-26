// --------------------------
//
// Deal APIs
//
// --------------------------
//
const HOST = "https://eats-by-js-api.herokuapp.com/"

export function createDeal(deal, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        data: {
            attributes: deal
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${HOST}/deals`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}
export function updateDeal(id, token, data) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = {
        data: {
            id: id,
            type: "deal",
            attributes: data
        }
    }

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    return fetch(`${HOST}/deals/${id}`, requestOptions)
        .then(response => response.json()).then(data => {
            if ("errors" in data) throw data;
        })
}
export function deleteDeal(id, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${HOST}/deals/${id}`, requestOptions)
        .then(response => response.json())
}
