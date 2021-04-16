'use strict';

const express = require('express');
// Array of users:
const Users = require('../models').User;
// Router instance:
const router = express.Router();
// Middlewares:
const {asyncHandler} = require('../middleware/async-handler');
const {authenticateUser} = require('../middleware/auth-user');

// Users routes:
// Get Route for a list of users:
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddress
    });
}));

// Post Route to add a new user:
router.post('/users', asyncHandler(async (req, res) => {
    let user;
    try {
        user = await Users.create(req.body);
        res.status(201).location("/")
            .json({
                "message": "New user created successfully!"
            }).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            const errors = error.errors.map(error => error.message);
            res.status(400).json({errors});
        } else {
            throw error;
        } 
    }
}));

module.exports = router;