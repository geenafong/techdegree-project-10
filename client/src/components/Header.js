import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
        <React.Fragment>
            <div className="bounds">
                <h1 className="header--logo"> Courses</h1>
                <nav><Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link></nav>  
            </div>
        </React.Fragment>
        )
    }
}


export default Header;