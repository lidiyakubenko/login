import React, {Component} from 'react'
import {Button, Card, Checkbox, Form, Icon, Input} from 'antd'
import {SocialIcon} from 'react-social-icons'

class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                alert('request sended')
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="form_container">
                <div className="form">
                    <h2>Login</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                    <div style={{width:'90%',display:'flex',justifyContent:'space-around'}}>
                        <SocialIcon network="twitter"/>
                        <SocialIcon network="facebook"/>
                        <SocialIcon network="github"/>
                        <SocialIcon network="google"/>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {}

export default Form.create({name: 'normal_login'})(Login)
