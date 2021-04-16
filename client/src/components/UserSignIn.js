import React, {Component} from 'react';
import Form from './Form';

class UserSignIn extends Component {
    state = {
        emailAddress: "",
        password: "",
        errors: [],
    }

    change = (e) => {
        const stateName = e.target.name;
        const value = e.target.value;

        this.useState(() => {
            return {
                [stateName]: value
            }
        })
    };

    submit = () => {
        const {context} = this.props;
        const {emailAddress, password} = this.state;

        // Create new user:
        const username = emailAddress;
        const user = {username, password};

        context.data.createUser(user)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(username, lastname)
                        .then(() => {
                            this.props.history.push('/');
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');
                // create this route?
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {emailAddress, password, errors} = this.state;

        return (
            <Form
                cancel={this.cancel}
                submit={this.submit}
                errors={errors}
                submiButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            id="emailAddress" 
                            name="emailAddress"
                            type="email"
                            value={emailAddress} 
                            onChange={this.change} 
                            placeholder="Email" />
                        <label htmlFor="firstname">Password</label>
                        <input
                            id="password" 
                            name="password" 
                            type="password"
                            value={password} 
                            onChange={this.change} 
                            placeholder="Password" />
                    </React.Fragment>
            )}/>
        )
    }
}

export default UserSignIn;