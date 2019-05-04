import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {setCurrentUser} from '../../redux/actions/app.action';
import { searchUsers, getUserRepositories} from '../../services/github.service'

export default function Repositories(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.currentUser);
    const [isRedirectToHome, setRedirectToHome] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const getUserFromUrl = () => {
        console.log("parse url")
        let location = window.location.href;
        let user = location.split("/").reverse()[1];
        searchUsers(user).then( users =>{
            if(users.length === 1){
                dispatch(setCurrentUser(users[0]));
            }else{
                setRedirectToHome(true)
            }
        })
    }
    
    //cdMount
    useEffect(() => {
        if(!user){
            getUserFromUrl();
        }else{
            getUserRepositories(user.login).then(repositories => setRepositories(repositories));
        }
    })

    if(isRedirectToHome){
        return(
            <Redirect to="/" />
        )
    }else{
        return (
            <div className="repositories page ">
                <div className="container flex flex-column flex-align-center">
                    {user && <div className="user flex flex-row flex-align-center">
                        <span className="avatar"><img src={user.avatar_url} alt="avatar" /></span>
                        <span className="login">{user.login}</span>
                    </div>}
                    <div className="list">
                        {repositories.map((repo, i) =>{
                            return (
                                <div className="repo" key={i}>
                                    {repo.full_name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}