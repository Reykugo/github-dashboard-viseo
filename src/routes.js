import React from 'react';
import {Route} from 'react-router-dom';

import Home from './components/home/Home';
import Repositories from './components/repositories/Repositories';

export default function Routes(){
    return(
        <>
            <Route exact path="/" component = {Home}/>
            <Route path="/:id/repos" component = {Repositories}/>
        </>
    )
}