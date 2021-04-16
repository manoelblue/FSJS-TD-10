'use strict';

const express = require('express');
// Array of users and courses:
const Users = require('../models').User;
const Courses = require('../models').Course;
// Router instance:
const router = express.Router();
// Middlewares:
const {asyncHandler} = require('../middleware/async-handler');
const {authenticateUser} = require('../middleware/auth-user');

//Courses routes:
// Get all Courses route:
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Courses.findAll({
        include: [{
            model: Users,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    res.json(courses);
    res.status(200).end();
}))

// Get route to a certain course:
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Courses.findAll({
        where: {
            id: req.params.id,
        },
        include: [{
            model: Users,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    res.json(course);
    res.status(200).end();
}))

// Post route to add a course:
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
        course = await Courses.create(req.body);
        res.status(201).location(`/courses/${course.id}`).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(error => error.message);
            res.status(400).json({errors});
        } else {
            throw error;
        } 
    }
}));

// Put route to update a course:
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
        const currentUser = req.currentUser;
        course = await Courses.findByPk(req.params.id);

        if (course) {
            if (course.userId === currentUser.id) {
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({message: "Not authorized operation."}).end();
            }
        }
    } catch(error) {
        if(error.name === "SequelizeValidationError") {
            console.log(error);
            res.status(400).json({
                message: "The course could not be updated."
            }).end()
        } else {
            console.log(error);
            throw error;
        }
    }
}));

// Delete route to delete a course:
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser;
    const course = await Courses.findByPk(req.params.id);

    if (course.userId === currentUser.id) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(403).json({ message: "Not authorized operation."}).end();
    }
}));

module.exports = router;