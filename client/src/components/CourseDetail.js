import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {Link, Redirect} from 'react-router-dom';
import config from '../config';

class CourseDetail extends Component {
    state = {
        course: {},
        id: this.props.match.params.id,
    };

    // Fetch course:
    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
            .then(res => res.json())
            .then(data => this.setState({
                course: data[0],
            }))
            .catch(error => {
                <Redirect error={error} to="/error" />
            })
    };

    // Delete course method:
    delete = () => {
        const {context} = this.props;
        const {username, password} = context.authenticatedUser;
        const {id} = this.state;

        context.data.deleteCourse(username, password, id)
            .then(errors => {
                if(errors.length) {
                    console.log(errors);
                    this.setState({errors});
                } else {
                    console.log('Course was successfully deleted!')
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');
            })
    }

    render() {
        const {course, id} = this.state;
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const {title, description, estimatedTime, materialsNeeded, userId, User} = course;
        const author = User ? `${User.firstName} ${User.lastName}` : '';

        if (course) {
            return (
                <React.Fragment>
                    <div className="actions--bar">
                        <div className="wrap">
                            { authUser && authUser.userId === userId ?
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <Link className="button" to="/" onClick={this.delete} >Delete Course</Link>
                                </React.Fragment>
                                : null
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                    
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{title}</h4>
                                    <p>By {author}</p>
    
                                    <ReactMarkdown>{description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{estimatedTime}</p>
    
                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <Redirect to="/notfound" />
            )
        }
    }
}

export default CourseDetail;