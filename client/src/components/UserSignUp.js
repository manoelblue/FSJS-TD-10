import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
    state = {
        firstname: "",
        lastname: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
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
        const {firstname, lastname, password} = this.state;

        // Create new user:
        const username = `${firstname} ${lastname}`;
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
        const {firstname, lastname, emailAddress, password, confirmPassword, errors} = this.state;

        return (
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="firstname">First Name</label>
                            <input
                                id="firstname" 
                                name="firstname" 
                                type="text"
                                value={firstname} 
                                onChange={this.change} 
                                placeholder="First Name" />
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                id="lastname" 
                                name="lastname" 
                                type="text"
                                value={lastname} 
                                onChange={this.change} 
                                placeholder="Last Name" />
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
                            <label htmlFor="firstname">Confirm Password</label>
                            <input
                                id="confirmPassword" 
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword} 
                                onChange={this.change} 
                                placeholder="Confirm Password" />
                        </React.Fragment>
                )} />
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        )
    }

}

export default UserSignUp;