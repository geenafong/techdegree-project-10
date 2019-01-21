'use strict';

const express = require("express");
const router = express.Router();
const Course = require("../models").Course;
const User = require("../models").User;

const auth = require("basic-auth");
const bcrypt = require('bcryptjs');

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get("/courses", function (req, res, next) {
    Course.find({}) 
             .populate("user", "firstName lastName")
             .exec(function(err, courses){
                if(err) return next(err);
                res.status(200);
                res.json(courses);
    });  
});

// GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get("/courses/:id", function(req, res) {
    Course.findById(req.params.id) 
             .populate("user", "firstName lastName")
             .exec(function(err, course){
                if(err) return next(err);
                res.status(200);
                res.json(course);
    });});

// A middleware function that attempts to get the user credentials from the Authorization header set on the request
router.use(function(req, res, next){
    if(auth(req)){
        User.findOne({emailAddress: auth(req).name})
          .exec(function(err, user){
            if(user){
                bcrypt.compare(auth(req).pass, user.password, function(err,res){
                    if (res){
                        req.user = user;
                        next();
                    } else {
                        const err = new Error("You are currently not authorized.")
                        err.status = 401;
                        return next(err);
                    }
                });
            } else {
                const err = new Error("You are not logged in. Please try again.")
                err.status = 401;
                return next(err);
            }
        })
    }
});

// GET /api/users 200 - Returns the currently authenticated user
router.get("/users", function (req, res, next) {
    User.find({}) 
       .exec(function(err, user){
           if(err) return next(err);
            res.json(req.user);
       });
});

//To check for IDs
router.param("id", function(req,res,next,id){
    Course.findById(id, function(err, doc){
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.course = doc;
        return next();
    });
});

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post("/courses", function (req, res, next) {
    if(req.user){
        if(req.body.description && req.body.title) {
            const newCourse = new Course(req.body);
            Course.create(newCourse, function(err, course){
                if(err) return next(err);
                res.location('/');
                res.sendStatus(201);
            });
        } else {
            const err = new Error("You must enter a title and description");
            err.status = 400;
            return next(err);
        }
    };
});
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put("/courses/:id", function (req, res, next) {
    if (req.course.user.toString() === req.user._id.toString()){
        req.course.update(req.body, function(err, result){
            if(err) return next(err);
            return res.sendStatus(204);
        });
    } else {
        const err = new Error('You are not able to edit this course because you did not create it.');
        err.status = 403;
        next(err);
    }
  });
// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete("/courses/:id", function (req, res, next) {
    if(req.user){
        if (req.course.user.toString() === req.user._id.toString()){
            req.course.remove();
            res.sendStatus(204);
        };
    } else {
        const err = new Error("You are not able to delete this course because you did not create it.");
        err.status = 403;
        return next(err);
    }
});


module.exports = router;