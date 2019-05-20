import React, {Component} from 'react'
import {Button, Form, Icon, Input, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from "axios";

class RestorePasswordInit extends Component {

    handleSubmit = e => {
        e.preventDefault();
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
                            title: 'Check your email',
                            content: 'We have just sent you a link to reset your password. This link is valid for 3 days!',
                        });
                    })
                    .catch(error => {
                        const message = error.response.data.message;
                        message === 'email-not-found' ?
                            this.props.form.setFields({
                                email: {
                                    value: values.email,
                                    errors: [new Error('Email not found!')],
                                }
                            }) : console.log(message)
                    })


            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
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
                    <Button type="primary" htmlType="submit" className="form-button">
                        Reset my Password
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default withRouter(Form.create({name: 'normal_restore_password_init'})(RestorePasswordInit))
