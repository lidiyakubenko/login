import React, {Component} from 'react'
import {Button, Form, Icon, Input, Modal} from 'antd'
import axios from 'axios'
import {injectIntl} from 'react-intl'
import {messages} from './messages'

class RestorePasswordFinish extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const {intl: {formatMessage}} = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/account/reset-password/finish',
                    data: {
                        newPassword: values.password,
                        key: this.props.match.params.key
                    },
                    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                })
                    .then(() => {
                        Modal.success({
                            onOk: () => {
                                this.props.history.replace(`/login`)
                            },
                            title: formatMessage(messages.changePassModalTitle),
                            content: formatMessage(messages.changePassModalContent),
                        })
                    })
                    .catch(error => {
                        const message = error.response.data.message
                        message === 'reset-key-not-found' ?
                            Modal.error({
                                title: formatMessage(messages.restoreErrModalTitle),
                                content: formatMessage(messages.restoreErrModalContent),
                            }) : console.log(message)
                    })


            }
        })
    }


    render() {
        const {intl: {formatMessage}} = this.props
        const {getFieldDecorator} = this.props.form
        return (
            <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
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
                        {formatMessage(messages.buttChangePass)}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default injectIntl(Form.create({name: 'normal_restore_password_finish'})(RestorePasswordFinish))
