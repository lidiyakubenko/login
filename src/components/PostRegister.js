import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PathControl from './PathControl'

class PostRegister extends Component {
    render() {
        const {isRegistered, goToNextForm} = this.props;
        return (
            <div className={isRegistered ?
                'message_after_register flipInYMine' : 'message_after_register animated flipOutY faster'}>
                <strong>Registration saved!</strong> Please check your email for confirmation.
                <a onClick={() => goToNextForm('/registration')}>Sign up</a>
            </div>
        )
    }
}

PostRegister.propTypes = {
    isRegistered:PropTypes.bool
};

export default PathControl(PostRegister)
