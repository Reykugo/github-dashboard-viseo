import React from 'react';
import {Route} from 'react-router-dom';

import Home from './components/home/Home';
import Repositories from './components/repositories/Repositories';
import Project from './components/project/Project';

export default function Routes(){
    return(
        <>
            <Route exact path="/" component = {Home}/>
            <Route exact path="/:user/repos" component = {Repositories}/>
            <Route exact path="/:user/repos/:project" component = {Project}/>
        </>
    )
}