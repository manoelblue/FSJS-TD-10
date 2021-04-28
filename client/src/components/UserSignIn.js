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

        this.setState(() => {
            return {
                [stateName]: value
            }
        })
    };

    submit = () => {
        const {context} = this.props;
        const {emailAddress, password} = this.state;

        context.actions.signIn(emailAddress, password)
            .then( user => {
                if(user === null) {
                    this.setState(() => {
                        return {errors: ['Sign-in was unsuccessful']};
                    })
                } else {
                    this.props.history.push('/');
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error')
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
                submitButtonText="Sign In"
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
                        <label htmlFor="password">Password</label>
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