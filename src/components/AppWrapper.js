import React, {Component} from 'react'
import {IntlProvider, addLocaleData} from 'react-intl'
import ruLocaleData from 'react-intl/locale-data/ru'
import translations from '../i18n/locales'
import App from './App'
import {withRouter} from 'react-router-dom'
import {LocaleProvider} from 'antd'
import en from 'antd/lib/locale-provider/en_US'
import ru from 'antd/lib/locale-provider/ru_RU'

addLocaleData(ruLocaleData)

class AppWrapper extends Component {
    render() {
        const {pathname} = this.props.location
        const locale = pathname.split('/')[1] || 'en'
        const messages = translations[locale]
        return (
            <LocaleProvider locale={locale === 'en' ? en : ru}>
                <IntlProvider locale={locale} key={locale} messages={messages}>
                    <App/>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}

export default withRouter(AppWrapper)