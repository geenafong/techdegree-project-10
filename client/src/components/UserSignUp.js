import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account
class UserSignUp extends React.Component {
    state = {
        firstName:"",
        lastName:"",
        emailAddress: "",
        password: "",
        confirmPassword:"",
        signedIn: false,
        validationError:false

    }

    signUp = (firstName, lastName, emailAddress, password) => {
        axios.post('http://localhost:5000/api/users', {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password
        }) .then(response => {
            if (response.status === 201) {
              this.setState({validationError: false})
              this.props.signIn(emailAddress, password)
            }
          }).catch (error => {
            if (error.response.status === 400) {
              this.setState({validationError: true});
            } else if (error.response.status === 500) {
              this.props.history.push('/error');
            }
          })
    }
    //event handlers to change the state when the value of each changes
    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.signUp(this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName)
    }
     
    render() {
        return (
          <React.Fragment>
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div><input ref={(input) => this.firstName = input} onChange={this.firstNameEntered} id="firstName" name="firstName" type="text" className="" placeholder="First Name"/></div>                        
                        <div><input ref={(input) => this.lastName = input} onChange={this.handleChange} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" /> </div>
                        <div><input ref={(input) => this.emailAddress = input} onChange={this.handleChange} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /> </div>
                        <div><input ref={(input) => this.password = input} onChange={this.handleChange} id="password" name="password" type="password" className="" placeholder="Password" /> </div>
                        <div><input ref={(input) => this.confirmPassword = input} onChange={this.handleChange} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" /> </div>
                        <div className="grid-100 pad-bottom">
                        <Link to={"/"}><button className="button" type="submit">Sign Up</button></Link>
                        <Link to={"/"}><button className="button button-secondary" onClick={this.cancel}>Cancel</button></Link>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
          </React.Fragment>
        );
    }
}

export default UserSignUp;