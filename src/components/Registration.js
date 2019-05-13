import React, {Component} from 'react'
import {Button, Form, Icon, Input} from 'antd'
import ComponentsControl from './ComponentsControl'
import axios from 'axios/index'

class Registration extends Component {

    state = {
        confirmDirty: false,
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/account/register',
                    data: {...values, redirectUrl: document.referrer},
                    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                })
                    .then(() => {
                        this.props.registrationOver()
                    })
                    .catch(error => {
                        const message = error.response.data.message
                        message === 'email-exists' ?
                            this.props.form.setFields({
                                email: {
                                    value: values.email,
                                    errors: [new Error('Email is already in use! Please choose another one')],
                                }
                            }) :
                            message === 'user-exists' ?
                                this.props.form.setFields({
                                    username: {
                                        value: values.username,
                                        errors: [new Error('Username is already registered! Please choose another one')],
                                    }
                                }) : console.log(message)
                    })
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true})
        }
        callback()
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const {isRegistration, goToNextForm} = this.props
        return (
                <div className={isRegistration ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                    <h2>Registration</h2>
                    <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The input is not valid e-mail!',
                                }, {
                                    required: true, message: 'Please input your e-mail!',
                                }],
                            })(
                                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="E-mail"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your login!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        min: 6, message: 'At least six symbols!',
                                    },
                                    {
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       type="password" placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       type="password"
                                       placeholder="Confirm password"
                                       onBlur={this.handleConfirmBlur}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-button">
                                Register
                            </Button>
                            Or <a onClick={() => goToNextForm('/')}>Log in!</a>
                        </Form.Item>
                    </Form>
                </div>
        )
    }
}


export default Form.create({name: 'normal_registration'})(ComponentsControl(Registration))


