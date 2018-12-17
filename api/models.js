'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },    
    emailAddress: {
        type: String,
        required: [true, 'Email Address is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },})

const CourseSchema = new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },    
    estimatedTime: String,
    materialsNeeded: String
})

//To check the password
UserSchema.pre("save", function(next){
    let user = this;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
            user.password = hash;
          next();
        });
      });
    });
UserSchema.pre("save", function(next){
    let user = this;
    User.findOne({emailAddress: this.emailAddress}, 'emailAddress', function(err, res){
        if (res){
            const err = new Error("Please enter a new email, that email already exists.");
            err.status = 400;
            return next(err);
        } else {
            next();
        }
    })
})

const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports.Course = Course;
module.exports.User = User;