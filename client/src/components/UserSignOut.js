import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = ({context}) => {
    useEffect(() => context.actions.signOut());

    return (
        // Redirect to other route
        <Redirect to="/"></Redirect>
    )
}

export default UserSignOut;