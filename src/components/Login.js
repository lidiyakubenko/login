import React, {Component} from 'react'
import {Button, Form, Icon, Input} from 'antd'
import {SocialIcon} from 'react-social-icons'
import ComponentsControl from './ComponentsControl'
import {withRouter} from 'react-router-dom'
import axios from 'axios/index'

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        let bodyFormData = new FormData();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                bodyFormData.set('username', values.username);
                bodyFormData.set('password', values.password);
                axios({
                    method: 'post',
                    url: '/login',
                    data: bodyFormData,
                    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                })
                    .then((response) => {
                        window.location = response.data;
                    })
                    .catch(error => {
                        const status = error.response.status;
                        status === 401 ?
                            this.props.form.setFields({
                                username: {
                                    value: values.username,
                                    errors: [new Error('')],
                                },
                                password: {
                                    value: values.password,
                                    errors: [new Error('Could not log in. Recheck please login and password')],
                                }
                            }) : console.log(error)
                    })
            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {isLogin, goToNextForm} = this.props;
        return (
            <div className={isLogin ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                <h2>Login</h2>
                <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                {required: true, message: 'Please input your username!'},
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   autoComplete='username' placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Please input your Password!'}]
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   autoComplete='current-password' placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{width: '90%', display: 'flex', justifyContent: 'space-around'}}>
                    <SocialIcon network="google" url="/oauth2/authorization/google"/>
                    <SocialIcon network="github" url="/oauth2/authorization/github"/>
                    <SocialIcon network="facebook" url="/oauth2/authorization/facebook"/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexFlow: 'column', marginTop: 20}}>
                    <a onClick={() => goToNextForm('/registration')}>Sign up</a>
                    <div>or</div>
                    <p onClick={() => goToNextForm('/registration')}
                       className="login-form-forgot">Restore password</p>
                </div>
            </div>
        )
    }
}


export default withRouter(Form.create({name: 'normal_login'})(ComponentsControl(Login)))
