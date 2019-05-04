import React, {useEffect, useState} from "react";

import {useInput} from '../../hooks';
import t from '../../utils/locales';

import axios from 'axios';

export default function Home(){

    const searchInput = useInput("");

    const [searchResult, setSearchResult] = useState([]);


    const search = () => {
        axios.get(`https://api.github.com/search/users?q=${searchInput.value}`).then( res => {
            console.log(res);
            setSearchResult(res.data.items);
        })
    }

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    return (
        <div className="home page flex flex-row flex-align-center flex-justify-center">
            <div className="container">
                <div className="search-input relative">
                    <input name="search" {...searchInput} placeholder={t("username")} onKeyPress={enterPressed}/>
                    <div className="search-result ">
                        {searchResult.map((user, i) => {
                            return (
                                <div className="user flex flex-align-center" key={i}>
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