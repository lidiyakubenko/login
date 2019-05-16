import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PostRegister extends Component {
    render() {
        return (
            <div className='message_form flipInYMine'>
                <strong>Registration saved!</strong> Please check your email for confirmation.
            </div>
        )
    }
}

PostRegister.propTypes = {
    isRegistered:PropTypes.bool
};

export default PostRegister
