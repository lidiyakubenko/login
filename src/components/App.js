import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import '../styles/global.scss'
import 'animate.css'
import Main from './Main'
import Activate from './Activate'

const lang = localStorage['lang'] ? JSON.parse(localStorage.getItem("lang")) : window.navigator.language.split('-')[0]

const App = () =>
    <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login"/>)}/>
        <Route exact path='/:lang(ru|en)/activate/:key' component={Activate}/>
        <Route exact path='/:lang(ru|en)/:tab(login|registration|restore)' component={Main}/>
        <Route exact path='/:lang(ru|en)/:tab(restore-finish)/:key' component={Main}/>
        <Route render={() => (<Redirect to={`${lang}/login`}/>)}/>
    </Switch>

export default App
