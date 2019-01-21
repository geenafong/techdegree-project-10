'use strict';

const express = require("express");

const router = express.Router();
const User = require("../models").User;

const bcrypt = require("bcryptjs");
const auth = require("basic-auth");

// The User Routes
//Get /api
router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });


// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post("/users", function (req, res, next) {
            if(req.body.emailAddress && /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(req.body.emailAddress)){
                const newUser = new User(req.body);
                User.create(newUser, function(err){
                    if(err) return next(err);
                    res.location('/');
                    res.sendStatus(201);
                }); 
            }else{
                const err = new Error("Please enter a valid email address.");
                err.status = 400;
                return next(err); 
        }
});

// A middleware function that attempts to get the user credentials from the Authorization header set on the request
// router.use(function(req, res, next){
//     if(auth(req)){
//         User.findOne({emailAddress: auth(req).name})
//           .exec(function(err, user){
//             if(user){
//                 bcrypt.compare(auth(req).pass, user.password, function(err,res){
//                     if (res){
//                         req.user = user;
//                         next();
//                     } else {
//                         const err = new Error("You are not authorized.")
//                         err.status = 401;
//                         return next(err);
//                     }
//                 });
//             } else {
//                 const err = new Error("You are not logged in. Please try again.")
//                 err.status = 401;
//                 return next(err);
//             }
//         })
//     }
// });

// GET /api/users 200 - Returns the currently authenticated user
router.get("/users", function (req, res, next) {
    User.find({}) 
       .exec(function(err, user){
           if(err) return next(err);
            res.json(req.user);
       });
});

module.exports = router;