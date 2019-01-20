import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';
import PropTypes from 'prop-types';


class Header extends Component {  
    static propTypes = {
        user: PropTypes.object
     };  
    signOut = () => {
        this.setState({
            signedIn:false
        })
        window.location.reload();
        localStorage.clear();
    }

    render(){
        return(
        <Consumer>
         {context=> {
             if (context.signedIn){
                return (
                    <div className="header">
                        <div className="bounds">
                            <h1 className="header--logo"> Courses</h1>
                                <div>
                                <Link to="/">Welcome, {this.props.user.firstName}</Link>
                                <Link to="/signin" onClick={this.signOut}>Log Out</Link>
                                </div>
                        </div>
                    </div>
                )
        } else {
            return(
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                        <nav>
                            <Link to='/signUp' className="signup">Sign Up</Link>
                            <Link to='/signIn' className="signin">Sign In</Link>
                        </nav>
                    </div>
                </div>
            )
        }
        }}
        </Consumer>
      )
    }
}



export default Header;