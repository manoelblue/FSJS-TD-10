import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    const {context} = props;
    const authUser = context.authenticatedUser;
    const user = authUser ? `${authUser.firstName} ${authUser.lastName}` : "";

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    { authUser ?
                        <React.Fragment>
                            <ul className="header--signedout">
                                <li>{`Welcome, ${user}!`}</li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </ul>
                        </React.Fragment>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;