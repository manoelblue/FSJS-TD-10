import React, {Component} from 'react';
import Form from './Form';
import config from '../config';

class UpdateCourse extends Component {
    state = {
        course: {},
        errors: [],
        id: this.props.location.pathname.slice(9),
    }

    // Fetch the Course:
    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
        .then(res => res.json())
        .then(data => this.setState({
            course: data[0]
        }));
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
                console.log(error);
                this.props.history.push('/error');
                // create this route?
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {course, errors} = this.state;
        console.log(course);

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
                                    value={course}
                                    onChange={this.change}
                                    placeholder="Course Title" />
                                <label htmlFor="courseAuthor">Course Author</label>
                                <input
                                    id="courseAuthor"
                                    name="courseAuthor"
                                    type="text"
                                    value={course}
                                    onChange={this.change}
                                    placeholder="Course Author" />
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={course}
                                    onChange={this.change}
                                    placeholder="Course Description" />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={course}
                                    onChange={this.change}
                                    placeholder="Estimated Time" />
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <input
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    type="text"
                                    value={course}
                                    onChange={this.change}
                                    placeholder="Materials Needed" />
                            </div>
                        </div>
                    </React.Fragment>
                )}/>
        )
    }
};

export default UpdateCourse;