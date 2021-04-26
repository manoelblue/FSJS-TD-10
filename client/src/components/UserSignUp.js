import React, { Component } from 'react';
import Form from './Form';

class UserSignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        errors: [],
    }

    change = (e) => {
        const stateName = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
                [stateName]: value
            }
        })
    };

    submit = () => {
        const {context} = this.props;
        const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;

        // Create new user:
        const user = {firstName, lastName, emailAddress, password, confirmPassword};

        console.log(context);

        context.data.createUser(user)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                    console.log(`${emailAddress} is successfully signed up and authenticated!`)
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {firstName, lastName, emailAddress, password, confirmPassword, errors} = this.state;

        return (
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Sign Up"
                elements={() => (
                    <React.Fragment>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName" 
                            name="firstName" 
                            type="text"
                            value={firstName} 
                            onChange={this.change} 
                            placeholder="First Name" />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName" 
                            name="lastName" 
                            type="text"
                            value={lastName} 
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
                        <label htmlFor="password">Password</label>
                        <input
                            id="password" 
                            name="password" 
                            type="password"
                            value={password} 
                            onChange={this.change} 
                            placeholder="Password" />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword} 
                            onChange={this.change} 
                            placeholder="Confirm Password" />
                    </React.Fragment>
            )} />
        )
    }

}

export default UserSignUp;