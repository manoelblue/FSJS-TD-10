import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import config from '../config';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses:
    useEffect(() => {
        fetch(`${config.apiBaseUrl}/courses`)
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    console.log(courses);

    // Map over courses
    const coursesList = courses.map((course, index) => (
        <Link
            to={`courses/${course.id}`}
            key={index}
            className="course--module course--link"
        >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </Link>
    ));

    return (
        <div className="wrap main--grid">
            {coursesList}
            <Link
                className="course--module course--add--module"
                to={"/courses/create"}
            >
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </Link>
        </div>
    )
}

export default Courses;