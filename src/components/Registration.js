import React, {Component} from 'react'
import {Button, Form, Icon, Input, Modal} from 'antd'
import axios from 'axios/index'
import {injectIntl} from 'react-intl'
import {messages} from './messages'
import {withRouter} from 'react-router-dom'

class Registration extends Component {

    state = {
        confirmDirty: false,
    }

    handleSubmit = e => {
        e.preventDefault()
        const {intl: {formatMessage}, match} = this.props
        const lang = match.params.lang
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/account/register',
                    data: {...values, lang},
                    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                })
                    .then(() => {
                        Modal.success({
                            title: formatMessage(messages.registerModalTitle),
                            content: formatMessage(messages.registerModalContent),
                        })
                    })
                    .catch(error => {
                        const message = error.response.data.message
                        message === 'email-exists' ?
                            this.props.form.setFields({
                                email: {
                                    value: values.email,
                                    errors: [new Error(formatMessage(messages.isUsedEmail))],
                                }
                            }) :
                            message === 'user-exists' ?
                                this.props.form.setFields({
                                    username: {
                                        value: values.username,
                                        errors: [new Error(formatMessage(messages.isUsedName))],
                                    }
                                }) : console.log(message)
                    })
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        const {intl: {formatMessage}} = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback(formatMessage(messages.mismatchPasswords))
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
        const {intl: {formatMessage}, redirectToUrl} = this.props
        const {getFieldDecorator} = this.props.form
        return (
            <div>
                <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: formatMessage(messages.isNotEmail),
                            }, {
                                required: true, message: formatMessage(messages.emptyEmail),
                            }],
                        })(
                            <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder={formatMessage(messages.email)}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: formatMessage(messages.emptyRegName)}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder={formatMessage(messages.nameRegister)}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    min: 6, message: formatMessage(messages.minLengthPass),
                                },
                                {
                                    required: true, message: formatMessage(messages.emptyPass),
                                }, {
                                    validator: this.validateToNextPassword,
                                }
                            ],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   type="password" placeholder={formatMessage(messages.password)}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: formatMessage(messages.emptyConfirm),
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   type="password"
                                   placeholder={formatMessage(messages.confirmPass)}
                                   onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            {formatMessage(messages.buttRegister)}
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                    <div>
                        {formatMessage(messages.returnTo)}
                        <a onClick={() => redirectToUrl('login')}> {formatMessage(messages.loginLink)}</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(injectIntl(Form.create({name: 'normal_registration'})(Registration)))


