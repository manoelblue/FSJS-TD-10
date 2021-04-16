'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const Users = require('../models').User;

exports.authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);

    // Check for existent credentials:
    if (credentials) {
        const user = await Users.findOne({ where: {emailAddress: credentials.name}});
        // Check for existent user:
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
            // Check for correct password:
            if (authenticated) {
                console.log(`Authentication successful for the user: ${user.emailAddress}.`);

                // Add the user to the request object:
                req.currentUser = user;
            } else {
                message = `Authentication failed for the user: ${user.emailAddress}.`;
            }
        } else {
            message = `User ${credentials.emailAddress} not found!`
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access denied'});
    } else {
        next();
    }
};