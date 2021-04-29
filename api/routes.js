'use strict';

const express = require('express');
// Array of users:
const Users = require('./models').User;
// Array of courses:
const Courses = require('./models').Course;
// Router instance:
const router = express.Router();

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
        await cb(req, res, next)
        } catch(error){
        // Forward error to the global error handler
        next(error);
        }
    }
}

// Users routes:
// Get Route for a list of users:
router.get('/users', asyncHandler(async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
    res.status(200).end();
}));

// Post Route to add a new user:
router.post('/users', asyncHandler(async (req, res) => {
    let user;
    try {
        user = await Users.create(req.body);
        res.status(201).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            console.log(error);
            res.json({
                message: "The user could not be created."
            });
            res.status(400).end()
        } else {
            console.log(error);
            throw error;
        } 
    }
}));

//Courses routes:
// Get all Courses route:
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Courses.findAll();
    res.json(courses);
    res.status(200).end();
}))

// Get route to a certain course:
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const courses = await Courses.findByPk(req.params.id);
    res.json(courses);
    res.status(200).end();
}))

// Post route to add a course:
router.post('/courses', asyncHandler(async (req, res) => {
    let course;
    try {
        user = await Courses.create(req.body);
        res.status(201).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            console.log(error);
            res.json({
                message: "The course could not be created."
            });
            res.status(400).end()
        } else {
            console.log(error);
            throw error;
        } 
    }
}));

// Put route to update a course:
router.put('/courses/:id', asyncHandler(async (req, res) => {
    let course;
    try {
        course = await Courses.findByPk(req.params.id);
        if (course) {
            await course.update(req.body);
            res.status(204).end();
        } else {
            res.status(404).json({message: "Course was not updated"});
        }
    } catch(error) {
        if(error.name === "SequelizeValidationError") {
            console.log(error);
            res.json({
                message: "The course could not be updated."
            });
            res.status(400).end()
        } else {
            console.log(error);
            throw error;
        }
    }
}));

// Delete route to delete a course:
router.delete('/courses/:id', asyncHandler(async (req, res) => {
    let course = await Courses.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
}));

module.exports = router;