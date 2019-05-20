import React, {Component} from 'react'
import '../styles/global.scss'
import 'animate.css'
import {Card, Dropdown, Icon, Menu, Tabs} from "antd";
import Login from "./Login";
import Registration from "./Registration";
import RestorePasswordInit from "./RestorePasswordInit";
import {withRouter} from 'react-router-dom';


class Main extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: props.match.params.tab
        };
    }

    onTabChange = (key) => {
        this.props.history.replace(`/${key}`);
        this.setState({activeKey: key})

    };

    getTitle = () => {
        switch (this.state.activeKey) {
            case 'login':
                return 'Login';
            case 'registration':
                return 'Registration';
            case 'restore':
                return 'Forgot Password';
        }
        return this.state.activeKey.charAt(0).toUpperCase() + this.state.activeKey.slice(1);
    };

    langMenu = (
        <Menu selectable={true}>
            <Menu.Item key="0">
                <a>English</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a>Русский</a>
            </Menu.Item>
        </Menu>
    );

    langDropDown = (
        <Dropdown overlay={this.langMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
                Lang <Icon type="down"/>
            </a>
        </Dropdown>
    );

    render() {
        return <div className={'form_container'}>
            <div className="form">
                <Card title={this.getTitle()} bordered={false} extra={this.langDropDown}>
                    <Tabs tabPosition={"bottom"}
                          activeKey={this.state.activeKey}
                          onChange={this.onTabChange}
                          size={"small"}>
                        <Tabs.TabPane tab="Login" key="login">
                            <Login/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Sign Up" key="registration">
                            <Registration/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Restore" key="restore">
                            <RestorePasswordInit/>
                        </Tabs.TabPane>
                    </Tabs>
                </Card></div>
        </div>
    }
}

export default withRouter(Main)
