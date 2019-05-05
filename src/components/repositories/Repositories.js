import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';

import {setCurrentUser} from '../../redux/actions/app.action';
import { searchUsers, getUserRepositories} from '../../services/github.service'

export default function Repositories(props){

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.currentUser);
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [isRedirectToHome, setRedirectToHome] = useState(false);
    const [isRedirectToProject, setRedirectToProject] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const getUserFromUrl = () => {
        let user = props.match.params.user;
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
        }else if(!isRedirectToHome){
            getUserRepositories(user.login).then(repositories => setRepositories(repositories));
        }
    }, [user])

    const selectProject = (project) => {
        setRedirectToProject(true);
        setSelectedProjectName(project.name)

    }

    if(isRedirectToHome){
        return(
            <Redirect to="/" />
        )
    }else if(isRedirectToProject){
        return(
            <Redirect to={`/${user.login}/repos/${selectedProjectName}`}/>
        )

    }else{
        return (
            <div className="repositories page relative">
                <NavLink to="/"><i className="return-arrow fas fa-arrow-left"></i></NavLink>
                <div className="container flex flex-column flex-align-center">
                    {user && <div className="user flex flex-row flex-align-center">
                        <span className="avatar"><img src={user.avatar_url} alt="avatar" /></span>
                        <span className="login">{user.login}</span>
                    </div>}
                    <div className="list">
                        {repositories.map((repo, i) =>{
                            return (
                                <div className="repo" key={i} onClick={() => selectProject(repo)}>
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