import React, {Component} from 'react'
import {Button, Checkbox, Form, Icon, Input} from 'antd'
import {SocialIcon} from 'react-social-icons'
import PathControl from './PathControl'
import {withRouter} from 'react-router-dom'

class Login extends Component {
    handleSubmit = e => {
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
        const {isLogin, goToNextForm} = this.props
        return (
            <div className={isLogin ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                <h2>Login</h2>
                <Form  style={{width:'100%'}} onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
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
                        <Button type="primary" htmlType="submit" className="form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{width: '90%', display: 'flex', justifyContent: 'space-around'}}>
                    <SocialIcon network="twitter"/>
                    <SocialIcon network="facebook"/>
                    <SocialIcon network="github"/>
                    <SocialIcon network="google"/>
                </div>
                <div style={{display:'flex',alignItems:'center',flexFlow:'column', marginTop:20}}>
                    <a onClick={() => goToNextForm('/registration')}>Sign up</a>
                    <div>or</div>
                    <p onClick={() => goToNextForm('/registration')}
                       className="login-form-forgot">Restore password</p>
                </div>
            </div>
        )
    }
}

Login.propTypes = {}

export default withRouter(Form.create({name: 'normal_login'})(PathControl(Login)))
