import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PostRestorePassword extends Component {
    render() {
        return (
            <div className='message_form flipInYMine'>
                We have just sent you a link to reset your password. This link is valid for 3 days!
            </div>
        )
    }
}

PostRestorePassword.propTypes = {
    isResetPasswordInit: PropTypes.bool
};

export default PostRestorePassword
