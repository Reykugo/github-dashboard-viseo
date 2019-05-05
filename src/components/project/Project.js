import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';

import {getRepository, searchUsers, } from '../../services/github.service';
import {setCurrentProject, setCurrentUser} from '../../redux/actions/app.action'
export default function Project(props){

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.currentUser);
    const project = useSelector(state => state.app.currentProject);
    const [redirectToList, setRedirectToList] = useState(false);
    const [isRedirectToHome, setRedirectToHome] = useState(false);

    const getUserfromUrl = () =>{
        let userLogin = props.match.params.user;
        searchUsers(userLogin).then(users => {
            if (users.length === 1) {
                dispatch(setCurrentUser(users[0]));
            } else {
                setRedirectToHome(true)
            }
        })
    }

    const getProject = () => {
        let projectName = props.match.params.project;
        getRepository(user.login, projectName).then(project => {
            dispatch(setCurrentProject(project))
        }).catch(err => {
            setRedirectToList(true)
        })
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    useEffect(() => {
        if(!user){
            getUserfromUrl()
        }else{
            getProject();
        }
    }, [user])

    if(redirectToList){
        return (<Redirect to={`/${user.login}/repos`}/>)
    }else if(isRedirectToHome){
        return (<Redirect to="/"/>)
    }else{
        return (
            <div className="project page relative">
                {user && <NavLink to={`/${user.login}/repos`}><i className="return-arrow fas fa-arrow-left"></i></NavLink>}
                {project && user &&
                    <div className="container flex flex-column">
                        <div className="user-info flex flex-align-center flex-justify-center">
                            <img src={user.avatar_url} alt="avatar"/>
                            <div>
                                <h2 className="name">{user.login}</h2>
                                <h5 className="url">{user.url}</h5>
                            </div>
                        </div>
                        <div className="info flex-grow flex flex-column flex-align-center">
                            <h1 className="name">{project.name}</h1>
                            <h3 className= "url">{project.html_url}</h3>
                            <p className="description">{project.description}</p>
                            <ul className="other">
                                <li>
                                    <span className="label">Stars:</span> 
                                    <span>{project.stargazers_count}</span>
                                </li>
                                <li>
                                    <span className="label">Language:</span>
                                    <span>{project.language}</span>
                                </li>
                                <li>
                                    <span className="label">Created at:</span>
                                    <span>{formatDate(project.created_at)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                
                }
            </div>
        )
    }
}