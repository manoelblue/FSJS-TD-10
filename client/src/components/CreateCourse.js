import React, {Component} from 'react';
import Form from './Form';

class CreateCourse extends Component {
    state = {
        title: "",
        author: "",
        description: "",
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
        const {username, password} = context.authenticatedUser;
        const {title, author, description, estimatedTime, materialsNeeded, errors} = this.state;

        console.log(context.authenticatedUser);

        // Create new course:
        const course = {title, author, description, estimatedTime, materialsNeeded, errors};

        context.data.createCourse(course, username, password)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                    console.log(`${title} was successfully created!`)
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
        const {title, author, description, estimatedTime, materialsNeeded, errors} = this.state;

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
                                <label htmlFor="title">Course Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.change}
                                    placeholder="Course Title" />
                                <label htmlFor="author">Course Author</label>
                                <input
                                    id="author"
                                    name="author"
                                    type="text"
                                    value={author}
                                    onChange={this.change}
                                    placeholder="Course Author" />
                                <label htmlFor="description">Course Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
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