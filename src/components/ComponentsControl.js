import React, {Component} from 'react'
import PostRegister from './PostRegister'

const ComponentsControl = ComposedForm =>
    class FormControl extends Component {

        constructor(props) {
            super(props)
            this.state = {
                isLogin: this.props.match.url === '/login',
                isRegistration: this.props.match.url === '/registration',
                isRegistered: false
            }
        }

        goToNextForm = path => {
            const {history} = this.props
            this.setState({isLogin: path === '/login', isRegistration: path === '/registration'})
            setTimeout(() => history.replace(path), 400)
        }

        registrationOver = () => {
            this.setState({isLogin: false, isRegistration: false})
            setTimeout(() => this.setState({isRegistered: true}), 500)
        }

        render() {
            const {isRegistered} = this.state
            return (
                <div className="form_container">
                    {isRegistered ?
                        <PostRegister/>
                        :
                        <ComposedForm
                            {...this.props}
                            {...this.state}
                            goToNextForm={this.goToNextForm}
                            registrationOver={this.registrationOver}
                        />}

                </div>
            )
        }
    }

ComponentsControl.propTypes = {}

export default ComponentsControl


