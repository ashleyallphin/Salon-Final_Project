//   signOut functions here

export const signUp = (user) => {
    return fetch("/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const logIn = (user) => {
    return fetch("/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    } if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const logout = next => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch("/logout", {
        method: "GET"
    })
        .then(response => {
            console.log("logout", response);
            return response.json();
        })
        .catch(err => console.log(err));
};