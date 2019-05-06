import React, {Component} from 'react'
import {Button, Checkbox, Form, Icon, Input} from 'antd'
import PathControl from './PathControl'

class Registration extends Component {

    state = {
        confirmDirty: false
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                alert('request sended')
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
        const {isLogin, goToNextForm} = this.props
        return (
            <div className={!isLogin ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                <h2>Registration</h2>
                <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('eMail', {
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
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    min:6,message: 'At least six symbols!',
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

Registration.propTypes = {}

export default Form.create({name: 'normal_registration'})(PathControl(Registration))


