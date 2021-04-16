import React, {Component} from 'react';
import Form from './Form';

class CreateCourse extends Component {
    state = {
        courseTitle: "",
        courseAuthor: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: "",
    }

    render() {
        const {courseTitle, courseAuthor, courseDescription, estimatedTime, materialsNeeded} = this.state;

        return (
            <Form
                cancel={this.cancel}
                submit={this.submit}
                errors={errors}
                submiButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
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
                    </React.Fragment>
                )}/>
        )
    }
};

export default CreateCourse;