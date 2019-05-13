import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Whoops404 from './Whoops404'
import Login from './Login'
import Registration from './Registration'
import '../styles/global.scss'
import 'animate.css'

const App = () =>
    <Switch>
        <Route path='/' component={Login}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/activate' component={({location}) => {
            window.location = `/account/activate${location.search}`
            return null
        }}/>
        <Route component={Whoops404}/>
    </Switch>;
export default App
