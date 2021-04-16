import React, {useState, useEffect} from 'react';
import config from '../config';

const CourseDetail = (props) => {
    const [course, setCourse] = useState({});
    const id = props.location.pathname.slice(9);

    // Fetch course:
    useEffect(() => {
        fetch(`${config.apiBaseUrl}/courses/${id}`)
        .then(res => res.json())
        .then(data => setCourse(data[0]));
    }, [id]);

    const {title, description, estimatedTime, materialsNeeded} = course;
    const listOfMaterials =
        materialsNeeded
        ? materialsNeeded.split('* ').slice(1).map(material => <li>{material}</li>)
        : "";

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="/">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
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

                            <p>{description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {listOfMaterials}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;