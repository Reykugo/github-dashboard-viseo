import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import { useDispatch } from 'react-redux'

import {useInput} from '../../hooks';
import t from '../../utils/locales';
import {searchUsers} from "../../services/github.service";
import {setCurrentUser} from '../../redux/actions/app.action';

export default function Home(){

    const dispatch = useDispatch();
    const searchInput = useInput("");
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const search = () => {
       searchUsers(searchInput.value).then( users => {
            setSearchResult(users);
        })
    }

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    const selectUser = (user) => {
        dispatch(setCurrentUser(user))
        setSelectedUser(user);
    }

    if(selectedUser){
        return(<Redirect to={`/${selectedUser.login}/repos`} />)
    }else{
        return (
            <div className="home page flex flex-row flex-align-center flex-justify-center">
                <div className="container">
                    <div className="search-input relative">
                        <input name="search" {...searchInput} placeholder={t("username")} onKeyPress={enterPressed}/>
                        <div className="search-result ">
                            {searchResult.map((user, i) => {
                                return (
                                    <div className="user flex flex-align-center" key={i} onClick={() => selectUser(user)}>
                                        <span className="avatar"><img src={user.avatar_url} alt="avatar" /></span>
                                        <span className="login">{user.login}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    </div>
                    <button className="search-button btn btn-bold btn-color-white btn-bcolor-pink" disabled={searchInput.value === ""} onClick={search}>
                        {t("search")}
                    </button>
    
                    
            </div>
        )
    }

}