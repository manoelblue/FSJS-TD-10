import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Context
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Components:
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

// Components with Context:
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext =  withContext(CreateCourse);
const UpdateCourseWithContext =  withContext(UpdateCourse);
const CourseDetailWithContext =  withContext(CourseDetail);
const UserSignInWithContext =  withContext(UserSignIn);
const UserSignUpWithContext =  withContext(UserSignUp);
const UserSignOutWithContext =  withContext(UserSignOut);

const App = () => {
  return (
    <Router>
        <Header></Header>

        <main>
          <Switch>
            <Route exact to="/" component={CoursesWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route to="/courses/:id" component={CourseDetailWithContext} />
            <Route to="signin" component={UserSignInWithContext} />
            <Route to="signup" component={UserSignUpWithContext} />
            <Route to="signout" component={UserSignOutWithContext} />
          </Switch>
        </main>
    </Router>
  );
}

export default App;
