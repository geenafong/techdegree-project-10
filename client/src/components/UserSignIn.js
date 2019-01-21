import React from 'react';
import {Link} from 'react-router-dom';
import { Consumer } from './Context'
import {withRouter} from 'react-router';


class UserSignIn extends React.Component {
    constructor(){
        super()
        this.state = {
        user: "",
        password: "",
        emailAddress:""
        }
    }

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.props.history, this.state.emailAddress, this.state.password)
    }
     
    render() {
        return (
            <Consumer>
              {context => {
                if (context.signedIn){
                    this.props.history.push('/courses')
                }
            return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                        <div><input id="emailAddress" name="emailAddress" onChange ={this.handleChange} type="text" className="" placeholder="Email Address" ref={(input) => this.user = input} value={this.state.emailAddress} /> </div>
                        <div><input id="password" name="password" onChange={this.handleChange} type="password" className="" placeholder="Password" ref={(input) => this.password = input} value={this.state.password} /> </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button>
                        <Link to="/courses"><button className="button button-secondary">Cancel</button></Link></div>

                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
            );
            }}
        </Consumer>
        );
    }
}
export default withRouter (UserSignIn);