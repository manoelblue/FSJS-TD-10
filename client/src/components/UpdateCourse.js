import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from './Form';
import config from '../config';

class UpdateCourse extends Component {
    state = {
        title: "",
        author: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
        userId: null,
        User: {},
        id: this.props.location.pathname.slice(9, 10),
    }

    // Fetch course:
    componentDidMount() {
        console.log('mount');
        const {authenticatedUser} = this.props.context;

        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Data: ', data[0]);
            this.setState({
                title: data[0].title,
                author: `${data[0].User.firstName} ${data[0].User.lastName}`,
                description: data[0].description,
                estimatedTime: data[0].estimatedTime,
                materialsNeeded: data[0].materialsNeeded,
                userId: data[0].userId,
                User: data[0].User,
                errors: [],
            });

            if (data[0] && data[0].userId !== authenticatedUser.userId) {
                <Redirect to="/forbidden" />
            } else {
                <Redirect to="/notfound" />
            }
        })
        .catch(error => {
            <Redirect error={error} to="/error" />
        })
    };

    change = (e) => {
        const stateName = e.target.name;
        const value = e.target.value;

        console.log('state: ', stateName);
        console.log('value: ', value);

        this.setState(() => {
            return {
                [stateName]: value
            }
        })
    };

    submit = () => {
        const {context} = this.props;
        const {username, password} = context.authenticatedUser;
        const {title, description, estimatedTime, materialsNeeded, userId, id} = this.state;
        const course = {
            userId: userId,
            id: id,
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
        }

        console.log('COURSE: ', course);

        context.data.updateCourse(course, username, password, id)
            .then(errors => {
                if(errors.length) {
                    console.log(errors);
                    this.setState({errors});
                } else {
                    console.log('Course was successfully updated!')
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
        const {authenticatedUser} = this.props.context;
        const {title, description, estimatedTime, materialsNeeded, userId, errors} = this.state;

        console.log(this.state);

        if (userId && userId === authenticatedUser.userId)  {
            return (
                <Form
                    cancel={this.cancel}
                    submit={this.submit}
                    errors={errors}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="title">Course Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={this.change}
                                        placeholder={title} />
                                    <label htmlFor="description">Course Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={this.change}
                                        placeholder={description} />
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        value={estimatedTime}
                                        onChange={this.change}
                                        placeholder={estimatedTime} />
                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        type="text"
                                        value={materialsNeeded}
                                        onChange={this.change}
                                        placeholder={materialsNeeded} />
                                </div>
                            </div>
                        </React.Fragment>
                    )}/>
            )
        } else {
            return (
                <div className="form--centered">
                    <h2>Loading...</h2>
                </div>
            )
        }
    }
};

export default UpdateCourse;