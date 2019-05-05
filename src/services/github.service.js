import axios from "axios";


export function searchUsers(query){
    return axios.get(`https://api.github.com/search/users?q=${query}`).then(res => {
        return res.data.items;
    })
}

export function getUserRepositories(userLogin){
    return axios.get(`https://api.github.com/users/${userLogin}/repos`).then(res => {
        return res.data;
    })
}

export function getRepository(userLogin, projectName){
    return axios.get(`https://api.github.com/repos/${userLogin}/${projectName}`).then(res =>{
        return res.data;
    })
}