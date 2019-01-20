import React from 'react';
import {Link} from 'react-router-dom';

class SignOut extends Components {    
    signOut = () => {
        this.setState({
            signedIn: false
        })
        window.location.reload();
        localStorage.clear();
        
    }

    render(){
            const firstName = this.props.user.firstName;
            const lastName = this.props.user.lastName;
            return (
                    <div>
                    <Link to="#">Welcome {firstName + " " + lastName}</Link>
                    <Link to="#" onClick={this.eventLogOut}>Log Out</Link>
                    </div>
            );
        }
}

const SignIn = () => {
    return (
       <div>
          <Link className="signup" to="/signup">Sign Up</Link>
          <Link className="signin" to="/signin">Sign In</Link>
       </div>
    );
 }


export default SignOut;