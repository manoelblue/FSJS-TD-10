import React from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = () => {
    return (
        // Redirect to other route
        <div>
            <Redirect to="/"></Redirect>
        </div>
    )
}

export default UserSignOut;