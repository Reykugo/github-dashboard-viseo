import React from 'react';
import {Route} from 'react-router-dom';

import Home from './components/home/Home';

export default function Routes(){
    return(
        <>
            <Route exact path="/" component = {Home}/>
        </>
    )
}