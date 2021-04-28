import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from './Form';
import config from '../config';

class UpdateCourse extends Component {
    state = {
        course: {},
        errors: [],
        id: this.props.location.pathname.slice(9, 10),
    }

    // Fetch course:
    componentDidMount() {
        console.log('mount');
    };

    componentDidUpdate() {
        console.log('update');
        console.log(this.state);
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
        const {username, password} = context.authenticatedUser;
        const {course} = this.state;

        // context.data.updateCourse(course, username, password)
        //     .then(errors => {
        //         if(errors.length) {
        //             this.setState({
        //                 course,
        //                 errors,
        //             });
        //         } else {
        //             console.log('Course was successfully updated!')
        //             this.props.history.push('/');
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.props.history.push('/error');
        //     })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {context} = this.props;
        const {authenticatedUser} = context;
        const {course, errors, id} = this.state;
        const {title, description, estimatedTime, materialsNeeded, userId, User} = course;
        const author = User ? `${User.firstName} ${User.lastName}` : "";

        console.log('Path: ', this.props.location.pathname.slice(9, 10));
        console.log(`${config.apiBaseUrl}/courses/${this.state.id}`);
        console.log(course.length > 0);
        console.log(this.state);
        console.log(authenticatedUser);

        if (course.length > 0 && course.userId === authenticatedUser.userId)  {
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
                                    <label htmlFor="author">Course Author</label>
                                    <input
                                        id="author"
                                        name="author"
                                        type="text"
                                        value={author}
                                        onChange={this.change}
                                        placeholder={author} />
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
        } else if (course.length > 0 && course.userId !== userId) {
            return <Redirect to="/forbidden" />
        } else {
            return <Redirect to="/notfound" />
        }
    }
};

export default UpdateCourse;