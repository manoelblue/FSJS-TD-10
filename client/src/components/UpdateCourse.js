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
        id: this.props.match.params.id,
    }

    // Fetch course:
    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0) {
                    this.setState({
                        title: data[0].title,
                        author: `${data[0].User.firstName} ${data[0].User.lastName}`,
                        description: data[0].description,
                        estimatedTime: data[0].estimatedTime,
                        materialsNeeded: data[0].materialsNeeded,
                        userId: data[0].userId,
                        User: data[0].User,
                    });
                } else {
                    this.setState({userId: 0})
                }
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/error');
            })
    };

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
        const {userId, id, title, description, estimatedTime, materialsNeeded} = this.state;
        const course = {
            userId: userId,
            id: id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        }

        context.data.updateCourse(course, username, password, id)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                    console.log('Course was successfully updated!')
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    cancel = () => {
        const {id} = this.state;
        this.props.history.push(`/courses/${id}`);
    }

    render() {
        const {authenticatedUser} = this.props.context;
        const {title, description, estimatedTime, materialsNeeded, userId, errors} = this.state;

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
        } else if (userId && userId !== 0 && userId !== authenticatedUser.userId) {
            return <Redirect to="/forbidden"></Redirect>
        } else if (userId === 0) {
            return <Redirect to="/notfound"></Redirect>
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