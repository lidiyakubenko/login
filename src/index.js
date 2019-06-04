import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import axios from 'axios'
import AppWrapper from './components/AppWrapper'


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let csrfHeader = document.getElementsByName('_csrf_header')[0].content;
let csrfContent = document.getElementsByName('_csrf')[0].content;
if (csrfHeader && csrfContent) {
    axios.defaults.headers.common[csrfHeader] = csrfContent;
}

ReactDOM.render(
        <HashRouter>
            <AppWrapper/>
        </HashRouter>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
