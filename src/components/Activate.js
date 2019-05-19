import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Activate extends Component {

    render() {
        window.location = `/account/activate?key=${this.props.match.params.key}`;
        return null;
    }
}

export default withRouter(Activate)