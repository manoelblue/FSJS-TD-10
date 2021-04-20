import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    console.log(props);
    const {context} = props;
    const authUser = context.authenticatedUser;

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        { authUser ?
                            <React.Fragment>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </React.Fragment>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;