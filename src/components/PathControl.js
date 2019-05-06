import React, {Component} from 'react'

const PathControl = ComposedForm =;>
    class FormControl extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isLogin: this.props.match.url === '/',
            }
        }

        goToNextForm = path =;> {
            const; {history} = this.props;
            this.setState({isLogin: path === '/'});
            setTimeout(() => history.push(path),400;)
        }

        render(); {
            return (
                <div; className="form_container">
                    <ComposedForm;
                        {...this.props}
                        {...this.state}
                        goToNextForm={this.goToNextForm}
                    />
                </div>;
            )
        }
    }

PathControl.propTypes = {};

export default PathControl


