import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class UserSignUp extends React.Component {
    state = {
        firstName:"",
        lastName:"",
        emailAddress: "",
        password: "",
        confirmPassword:"",
        signedIn: false

    }
    enterFirstName = e => {
        this.setState({ firstName: e.target.value});
    }
    enterLastName = e => {
        this.setState({ lastName: e.target.value});
    }
    enterEmail = e => {
        this.setState({ emailAddress: e.target.value});
    }
    enterPassword = e => {
        this.setState({ password: e.target.value});
    }
    enterConfirmedPassword = e => {
        this.setState({ password: e.target.value});
    }
    //  handleSubmit = e => {
    //    e.preventDefault();
    //    let signIn = this.signIn.value;
    //    this.props.onSubmit(this.signIn.value);
    //    e.currentTarget.reset();
    //  }
     
    render() {
        return (
          <React.Fragment>
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                    <form>
                        <div><input ref={(input) => this.firstName = input} onChange={this.enterFirstName} id="firstName" name="firstName" type="text" className="" placeholder="First Name" value="" /> </div>
                        <div><input ref={(input) => this.lastName = input} onChange={this.enterLastName} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value="" /> </div>
                        <div><input ref={(input) => this.emailAddress = input} onChange={this.enterEmail} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /> </div>
                        <div><input ref={(input) => this.password = input} onChange={this.enterPassword} id="password" name="password" type="password" className="" placeholder="Password" value="" /> </div>
                        <div><input ref={(input) => this.confirmPassword = input} onChange={this.enterConfirmedPassword} id="confirmPassword" name="confirmPassword" type="confirmPassword" className="" placeholder="Confirm Password" value="" /> </div>
                        <div className="grid-100 pad-bottom">
                        <Link to={"/"}><button className="button" type="submit">Sign Up</button></Link>
                        <Link to={"/"}><button className="button button-secondary" onclick={this.cancel}>Cancel</button></Link>
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