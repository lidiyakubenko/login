import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import '../styles/global.scss'
import 'animate.css'
import Main from "./Main";
import Activate from "./Activate";

const App = () =>
    <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login"/>)}/>
        <Route exact path='/:tab(login|registration|restore)' component={Main}/>
        <Route exact path='/activate/:key/:redirectTo' component={Activate}/>
        <Route render={() => (<Redirect to="/login"/>)}/>
    </Switch>;
export default App
