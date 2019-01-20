import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';


class Header extends Component {  
    constructor() {
        super();
        this.state = {
            id: "",
            title:"",
            description:"",
            user:"",
            courses:[],
            isLoaded: false,
            signedIn: false
        }
    }

    render(){
        return(
        <Consumer>
         {context=> {
             if (context.signedIn){
                return (
                    <div className="header">
                        <div className="bounds">
                            <Link to="/"><h1 className="header--logo"> Courses</h1></Link>
                                <nav>
                                 <span>
                                    Welcome, {context.user.firstName}</span>
                                    <Link className="signout" to={"/signout"}>Log Out</Link> 
                               </nav>
                        </div>
                    </div>
                )
        } else {
            return(
                <div className="header">
                    <div className="bounds">
                        <Link to="/"><h1 className="header--logo"> Courses</h1></Link>
                        <nav>
                            <Link to='/signIn' className="signin">Sign In</Link>
                            <Link to='/signUp' className="signup">Sign Up</Link>
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