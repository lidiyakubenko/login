import React, {Component} from 'react'
import '../styles/global.scss'
import 'animate.css'
import {Card, Dropdown, Icon, Menu} from 'antd'
import Login from './Login'
import Registration from './Registration'
import RestorePasswordInit from './RestorePasswordInit'
import {withRouter} from 'react-router-dom'
import {injectIntl} from 'react-intl'
import {messages} from './messages'
import RestorePasswordFinish from './RestorePasswordFinish'


class Main extends Component {

    state = {
        isRedirect: false
    }

    componentWillMount() {
        console.log('mount main')
    }

    redirectToUrl = tab => {
        const {match, history} = this.props
        this.setState({isRedirect: true})
        setTimeout(() => history.replace(`/${match.params.lang}/${tab}`), 400)
        setTimeout(() => this.setState({isRedirect: false}), 450)
    }
    getTitle = () => {
        const {intl: {formatMessage}, match} = this.props
        switch (match.params.tab) {
            case 'login':
                return formatMessage(messages.login)
            case 'registration':
                return formatMessage(messages.registration)
            case 'restore':
                return formatMessage(messages.restore)
            case 'restore-finish':
                return formatMessage(messages.restoreFinish)
            default:
                return match.params.tab.charAt(0).toUpperCase() + match.params.tab.slice(1)
        }
    }

    langMenu = () => {
        const {history, match} = this.props
        const params = match.params
        const url = params.tab === 'restore-finish' ? `/${match.params.key}` : ''
        return (
            <Menu selectable={true}
                  onClick={e => history.push(`/${e.key}/${params.tab}${url}`)}
                  selectedKeys={[match.params.lang]}>
                <Menu.Item key="en">
                    <a>English</a>
                </Menu.Item>
                <Menu.Item key="ru">
                    <a>Русский</a>
                </Menu.Item>
            </Menu>
        )
    }

    langDropDown = () => {
        const {intl: {formatMessage}} = this.props
        return (
            <Dropdown overlay={this.langMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    {formatMessage(messages.lang)} <Icon type="down"/>
                </a>
            </Dropdown>
        )
    }

    render() {
        const {isRedirect} = this.state
        const {match} = this.props
        return (
            <div className='form_container'>
                <div className={!isRedirect ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                    <Card title={this.getTitle()} bordered={false} extra={this.langDropDown()}>
                        {match.params.tab === 'login' ?
                            <Login redirectToUrl={this.redirectToUrl}/>
                            :
                            match.params.tab === 'restore-finish' ?
                                <RestorePasswordFinish/>
                                :
                                match.params.tab === 'registration' ?
                                    <Registration redirectToUrl={this.redirectToUrl}/>
                                    :
                                    <RestorePasswordInit redirectToUrl={this.redirectToUrl}/>
                        }
                    </Card>
                </div>
            </div>)
    }
}

export default withRouter(injectIntl(Main))
