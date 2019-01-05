import React from 'react';
import {Link} from 'react-router-dom';

const Header = props => {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo"> Courses</h1>
                <nav><Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link></nav>  
            </div>
        </div>
    )
    }



export default Header;