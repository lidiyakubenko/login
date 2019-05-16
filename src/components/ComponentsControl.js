import React, {Component} from 'react'
import PostRegister from './PostRegister'
import PostRestorePassword from "./PostRestorePassword";

const ComponentsControl = ComposedForm =>
    class FormControl extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isLogin: this.props.match.url === '/',
                isRegistration: this.props.match.url === '/registration',
                isRestorePassword: this.props.match.url === '/restore-password-init',
                isRegistered: false
            }
        }

        goToNextForm = path => {
            const {history} = this.props;
            this.setState({isLogin: path === '/', isRegistration: path === '/registration'});
            setTimeout(() => history.replace(path), 400)
        };

        registrationOver = () => {
            this.setState({isLogin: false, isRegistration: false});
            setTimeout(() => this.setState({isRegistered: true}), 500)
        };

        resetPasswordInit = () => {
            this.setState({isLogin: false, isRegistration: false, isRestorePassword: false});
            setTimeout(() => this.setState({isResetPasswordInit: true}), 500)
        };

        render() {
            const {isRegistered, isResetPasswordInit} = this.state;
            return (
                <div className="form_container">
                    {isRegistered ?
                        <PostRegister/>
                        : isResetPasswordInit ?
                            <PostRestorePassword/>
                            :
                        <ComposedForm
                            {...this.props}
                            {...this.state}
                            goToNextForm={this.goToNextForm}
                            registrationOver={this.registrationOver}
                            resetPasswordInit={this.resetPasswordInit}
                        />}

                </div>
            )
        }
    };

ComponentsControl.propTypes = {};

export default ComponentsControl


