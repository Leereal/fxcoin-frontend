import { setAuthorization } from "./general";

export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/login', credentials)
            .then((response) => {
                setAuthorization(response.data.access_token);
                res(response.data);
            })
            .catch((err) =>{
                rej("Wrong email or password");
            })
    })
}

export function getLocalUser() {
    const userStr = sessionStorage.getItem("user");

    if(!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}