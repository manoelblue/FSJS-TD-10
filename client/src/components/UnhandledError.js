import React from 'react';

const UnhandledError = (props) => {
    console.log(props);
    return (
        <div className="wrap">
            <h2>Unhandled Error!</h2>
            <p>Sorry! An unexpected error has occurred.</p>
        </div>
    )
}

export default UnhandledError;