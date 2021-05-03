import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';

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
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// Components with Context:
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext =  withContext(CreateCourse);
const UpdateCourseWithContext =  withContext(UpdateCourse);
const CourseDetailWithContext =  withContext(CourseDetail);
const UserSignInWithContext =  withContext(UserSignIn);
const UserSignUpWithContext =  withContext(UserSignUp);
const UserSignOutWithContext =  withContext(UserSignOut);

const App = () => {
  return (
    <Router history={history}>
        <HeaderWithContext />

        <main>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnhandledError} />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </main>
    </Router>
  );
}

export default App;
