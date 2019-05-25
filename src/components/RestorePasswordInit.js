import React, {Component} from 'react'
import {Button, Form, Icon, Input, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {injectIntl} from 'react-intl'
import {messages} from './messages'

class RestorePasswordInit extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const {intl: {formatMessage}} = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/account/reset-password/init',
                    data: values,
                    config: {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                })
                    .then(() => {
                        Modal.success({
                            title: formatMessage(messages.restoreModalTitle),
                            content: formatMessage(messages.restoreModalContent),
                        });
                    })
                    .catch(error => {
                        const message = error.response.data.message;
                        message === 'email-not-found' ?
                            this.props.form.setFields({
                                email: {
                                    value: values.email,
                                    errors: [new Error(formatMessage(messages.notFoundEmail))],
                                }
                            }) : console.log(message)
                    })


            }
        })
    };


    render() {
        const {intl: {formatMessage}} = this.props
        const {getFieldDecorator} = this.props.form;
        return (
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
                    <Button type="primary" htmlType="submit" className="form-button">
                        {formatMessage(messages.buttResetPass)}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default withRouter(injectIntl(Form.create({name: 'normal_restore_password_init'})(RestorePasswordInit)))
