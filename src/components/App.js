import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Whoops404 from './Whoops404'
import Login from './Login'
import Registration from './Registration'
import RestorePassword from './RestorePasswordInit'
import '../styles/global.scss'
import 'animate.css'

const App = () =>
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/registration' component={Registration}/>
        <Route exact path='/restore-password-init' component={RestorePassword}/>
        <Route exact path='/activate' component={({location}) => {
            window.location = `/account/activate${location.search}`;
            return null
        }}/>
        <Route component={Whoops404}/>
    </Switch>;
export default App
