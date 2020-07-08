export const read = (username, token) => {
    return fetch(`/user/${username}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch (err => console.log(err))
};

export const listArtists = () => {
    return fetch(`/users`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (username, token) => {
    return fetch(`/user/${username}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch (err => console.log(err))
        
};

export const updateAccount = (username, token, user) => {
    console.log(user)
    return fetch(`/user/${username}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json();
        })
        .catch (err => console.log(err))
};