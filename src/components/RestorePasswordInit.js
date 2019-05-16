import React, {Component} from 'react'
import {Button, Form, Icon, Input} from 'antd'
import ComponentsControl from './ComponentsControl'
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
                        this.props.resetPasswordInit()
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
        const {isRestorePassword} = this.props;
        return (
            <div className={isRestorePassword ? 'form flipInYMine' : 'form animated flipOutY faster'}>
                <h2>Forgot Password</h2>
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
            </div>
        )
    }
}


export default withRouter(Form.create({name: 'normal_restore_password_init'})(ComponentsControl(RestorePasswordInit)))
