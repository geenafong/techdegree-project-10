import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

//This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account
class UserSignUp extends Component {
    constructor(){
    super();
        this.state = {
            firstName:"",
            lastName:"",
            emailAddress:"",
            user: "",
            password: "",
            confirmPassword:"",
            error:"",
            signedUp: false,
            validation: ""

        }
    }   

    signUp = (firstName, lastName, emailAddress, password) => {
        axios.post('http://localhost:5000/api/users', {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password
        }).then(response => {
            if (response.status === 201) {
                this.setState({validation: false})
                this.props.signIn(emailAddress, password)
            }
          }).then(response => {
            this.props.history.push('/courses')
          })
          .catch (error => {
            if (error.response.status === 400) {
              if (error.response.data.message !== "") {
              this.setState({
                error: error.response.data.message
            })
        }
      }
    })
    }

    //event handlers to change the state when the value of each changes
    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    confirmPass = e => {
        this.setState({confirmPassword: e.target.value});
        if (e.target.value === this.state.password) {
            this.setState({validation: false});
        } else {
            this.setState({validation: true});
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.password  === this.state.confirmPassword) {
            this.signUp(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password)
        }
    }

    render() {
        // let err= props.err
        // let emailValidation;
        // let sameEmail;
        // let confirmPw;

        // if(err === "Please enter a valid email address"){
        //     emailValidation = <li>Please enter a valid email address</li>
        // } else if(err === "This email address is already in use"){
        //     sameEmail = <li>This email address is already in use</li>
        // } else if(err === "Passwords do not match"){
        //     confirmPw === <li>Passwords do not match</li>
        // }
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                     <ul>
                     {/* {emailValidation}
                     {sameEmail}
                     {confirmPw} */}
                     </ul>
                     </div>
                     <form onSubmit={this.handleSubmit}>
                        <div><input  id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange}/></div>
                        <div><input  id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange}/></div>
                        <div><input  id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange}/></div>
                        <div><input  id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange}/></div>
                        <div><input  id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.confirmPass}/></div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign Up</button>
                            <Link to={"/"}><button className="button button-secondary">Cancel</button></Link>
                        </div>
                        </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
        )
    }
}

export default withRouter(UserSignUp);