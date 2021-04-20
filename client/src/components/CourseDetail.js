import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import {Link, Redirect} from 'react-router-dom';
import config from '../config';

const CourseDetail = (props) => {
    const [course, setCourse] = useState({});
    const id = props.location.pathname.slice(9);
    const {context} = props;
    const authUser = context.authenticatedUser;

    // Fetch course:
    useEffect(() => {
        fetch(`${config.apiBaseUrl}/courses/${id}`)
        .then(res => res.json())
        .then(data => setCourse(data[0]))
                .catch(error => {
            <Redirect error={error} to="/error" />
        })
    }, [id]);

    const {title, description, estimatedTime, materialsNeeded} = course;

    if (course) {
        return (
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        { authUser && authUser.id === course.userId ?
                            <React.Fragment>
                                <Link className="button" to="/courses/:id/update">Update Course</Link>
                                <Link className="button" to="/">Delete Course</Link>
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
                                <p>By Joe Smith</p>

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
    } else {
        return (
            <Redirect to="/notfound" />
        )
    }

}

export default CourseDetail;