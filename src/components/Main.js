import React, {Component} from 'react'
import '../styles/global.scss'
import 'animate.css'
import {Card, Dropdown, Icon, Menu, Tabs} from 'antd'
import Login from './Login'
import Registration from './Registration'
import RestorePasswordInit from './RestorePasswordInit'
import {withRouter} from 'react-router-dom'
import {injectIntl} from 'react-intl'
import {messages} from './messages'


class Main extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            activeKey: props.match.params.tab
        }
    }

    onTabChange = (key) => {
        this.props.history.replace(`${key}`)
        this.setState({activeKey: key})

    }

    getTitle = () => {
        const {intl: {formatMessage},match} = this.props
        switch (match.params.tab) {
            case 'login':
                return formatMessage(messages.login)
            case 'registration':
                return formatMessage(messages.registration)
            case 'restore':
                return formatMessage(messages.restore)
            default:
                return this.state.activeKey.charAt(0).toUpperCase() + this.state.activeKey.slice(1)
        }
    }

    langMenu = () => {
        const {history, match} = this.props
        return (
            <Menu selectable={true}
                  onClick={e => history.push(`/${e.key}/${match.params.tab}`)}
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
        const {intl: {formatMessage},match} = this.props
        return <div className='form_container'>
            <div className="form">
                <Card title={this.getTitle()} bordered={false} extra={this.langDropDown()}>
                    {match.params.tab === 'login' ?
                        <Login/> : match.params.tab === 'registration' ?
                            <Registration/> : <RestorePasswordInit/>
                    }
                </Card>
            </div>
        </div>
    }
}

export default withRouter(injectIntl(Main))
