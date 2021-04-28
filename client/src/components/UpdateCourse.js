import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from './Form';
import config from '../config';

class UpdateCourse extends Component {
    state = {
        course: {},
        errors: [],
        id: this.props.location.pathname.slice(9, 1),
    }

    // Fetch the Course:
    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
        .then(res => res.json())
        .then(data => this.setState({
            course: data[0]
        }))
        .catch(error => {
            <Redirect error={error} to="/error" />
        })
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

        // Create new user:
        const username = emailAddress;
        const user = {username, password};

        context.data.createUser(user)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(username)
                        .then(() => {
                            this.props.history.push('/');
                        });
                }
            })
            .catch((error) => {
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {course, errors, id} = this.state;
        const {title, description, estimatedTime, materialsNeeded, userId, User} = course;
        const author = User ? `${User.firstName} ${User.lastName}` : "";

        if (course && course.userId === userId)  {
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
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        value={title}
                                        onChange={this.change}
                                        placeholder={title} />
                                    <label htmlFor="courseAuthor">Course Author</label>
                                    <input
                                        id="courseAuthor"
                                        name="courseAuthor"
                                        type="text"
                                        value={author}
                                        onChange={this.change}
                                        placeholder={author} />
                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
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
        } else if (course && id !== userId) {
            <Redirect to="/forbidden" />
        } else {
            <Redirect to="/notfound" />
        }
    }
};

export default UpdateCourse;