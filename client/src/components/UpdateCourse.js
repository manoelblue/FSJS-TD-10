import React, {Component, useState, useEffect} from 'react';
import Form from './Form';
import config from '../config';

class UpdateCourse extends Component {
    state = {
        course: {},
        errors: [],
    }

    // Fetch the Course:
    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${id}`)
        .then(res => res.json())
        .then(data => setCourse(data[0]));
    }

    render() {
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
                                <input
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

export default UpdateCourse;