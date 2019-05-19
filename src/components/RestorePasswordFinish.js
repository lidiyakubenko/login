import React, {Component} from 'react'
import {Button, Card, Form, Icon, Input, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from "axios";

class RestorePasswordFinish extends Component {

    handleSubmit = e => {
        e.preventDefault();
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
                            onOk: ()=>{
                                this.props.history.replace(`/login`);
                            },
                            title: 'Your password has been successfully changed.',
                            content: 'You will now be redirected to the login page where you can use your new password to log in.',
                        });
                    })
                    .catch(error => {
                        const message = error.response.data.message;
                        message === 'reset-key-not-found' ?
                            Modal.error({
                                title: 'Invalid reset key',
                                content: 'No user was found for this reset key!',
                            }) : console.log(message)
                    })


            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={'form_container'}>
                <Card title={'Enter a new password'} bordered={false} style={{width: 350}}>
                    <div className={'form'}>
                        <Form style={{width: '100%'}} onSubmit={this.handleSubmit}>
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
                                    Change password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        )
    }
}


export default withRouter(Form.create({name: 'normal_restore_password_finish'})(RestorePasswordFinish))
