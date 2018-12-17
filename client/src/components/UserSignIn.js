import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class UserSignIn extends React.Component {
    state = {
        emailAddress: "",
        password: "",
        signedIn: false

    }
    enterEmail = e => {
        this.setState({ emailAddress: e.target.value});
    }
    enterPassword = e => {
        this.setState({ password: e.target.value});
    }
     
    render() {
        return (
          <React.Fragment>
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                    <form>
                        <div><input ref={(input) => this.emailAddress = input} onChange={this.enterEmail} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /> </div>
                        <div><input ref={(input) => this.password = input} onChange={this.enterPassword} id="password" name="password" type="password" className="" placeholder="Password" value="" /> </div>
                        <div className="grid-100 pad-bottom">
                        <Link to={"/"}><button className="button" type="submit">Sign In</button></Link>
                        <Link to={"/"}><button className="button button-secondary" onclick={this.cancel}>Cancel</button></Link>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
          </React.Fragment>
        );
    }
}

export default UserSignIn;