import React, {Component} from 'react';
import Form from './Form';

class CreateCourse extends Component {
    state = {
        courseTitle: "",
        courseAuthor: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: []
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
        const {courseTitle, courseAuthor, courseDescription, estimatedTime, materialsNeeded, errors} = this.state;

        return (
            <Form
                cancel={this.cancel}
                submit={this.submit}
                errors={errors}
                submitButtonText="Create Course"
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={courseTitle}
                                    onChange={this.change}
                                    placeholder="Course Title" />
                                <label htmlFor="courseAuthor">Course Author</label>
                                <input
                                    id="courseAuthor"
                                    name="courseAuthor"
                                    type="text"
                                    value={courseAuthor}
                                    onChange={this.change}
                                    placeholder="Course Author" />
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={courseDescription}
                                    onChange={this.change}
                                    placeholder="Course Description" />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={estimatedTime}
                                    onChange={this.change}
                                    placeholder="Estimated Time" />
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    type="text"
                                    value={materialsNeeded}
                                    onChange={this.change}
                                    placeholder="Materials Needed" />
                            </div>
                        </div>
                    </React.Fragment>
                )}/>
        )
    }
};

export default CreateCourse;