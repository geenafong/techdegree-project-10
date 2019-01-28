'use strict';

const express = require("express");
const router = express.Router();
const Course = require("../models").Course;
const User = require("../models").User;

const auth = require("basic-auth");
const bcrypt = require('bcrypt');

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
  
  // POST /api/users 201 - Creates a user, sets the Location header to '/', and returns no content
   router.post('/users', function (req, res, next) {
    // if (!request.body.firstName) {
    //     const error = new Error("First name is required");
    //     error.status = 400;
    //     return next(error);
    //   }
    //   if (!request.body.lastName) {
    //     const error = new Error("Last name is required");
    //     error.status = 400;
    //     return next(error);
    //   }
    //   if (!request.body.emailAddress) {
    //     const error = new Error("Email address is required");
    //     error.status = 400;
    //     return next(error);
    //   }
    //   if (!request.body.password) {
    //     const error = new Error("Password is required");
    //     error.status = 400;
    //     return next(error);
    //   }
    let newUser = new User(req.body)
    newUser.validate(function (err, req, res) {
      if (err && err.name === 'ValidationError') {
        err.status = 400
        err.message = err.errors
        return next(err)
      }
    })
      User.find({ emailAddress: req.body.emailAddress }, function (err, users) {
        if (users.length !== 0) {
          const error = new Error('Email address is already in the system.')
          error.status = 400
  
          next(error)
        } else if (!/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.emailAddress)) {
          const error = new Error('The email you entered is not a valid email address')
          error.status = 400
  
          next(error)
        } else {newUser.save(function (err, user) {
            if (err) {
              return next()
            } else {
              res.location('/')
              res.sendStatus(201)
            }
          })
        }
      })
    })
  

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
                    if (res || auth(req).pass === user.password){
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
// router.get('/users', (req, res, next) => {
//       if(req.user) {
//         User.find({})
//           .exec((err, user) => {
//             if(err) return next(err);
//             res.status(200);
//             res.json(user);
//           });
//        } else {
//          const err = new Error("Please log in");
//          err.status = 400;
//          return next(err);
//        }
//     });
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
        const newCourse = new Course({...req.body, user: req.user._id});
        newCourse.save(function(err, newCourse) {
            if (err) return next(err)
            res.locals.id = newCourse._id
            res.status(201).send({ id: newCourse._id })
        })
     } else if (err.errors.title || err.errors.description || err && err.name === 'ValidationError') {
            const err = new Error("You must enter a title and description");
            err.status = 400;
            return next(err);
        }
});
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put("/courses/:id", function (req, res, next) {
    if (req.course.user.toString() === req.user._id.toString()){
        req.course.update(req.body, { upsert: true, runValidators: true }, function(err, result){
            if(err) return next(err);
            return res.sendStatus(204);
        });
    } else if (err && err.name === 'ValidationError') {
        err.status = 400
    }else {
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