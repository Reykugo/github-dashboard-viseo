import axios from "axios";


export function searchUsers(query){
    return axios.get(`https://api.github.com/search/users?q=${query}`).then(res => {
        return res.data.items
    })
}

export function getUserRepositories(user){
    return axios.get(`https://api.github.com/users/${user}/repos`).then(res => {
        return res.data
    })
}