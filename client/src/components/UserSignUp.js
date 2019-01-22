import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class SignUp extends Component {
  constructor () {
    super()
    this.state = {
      firstName:"",
      lastName:"",
      user:"",
      password:"",
      confirmPass:"",
      validation: "",
      error:"",
    }
  }


signUp = (firstName, lastName, user, password) => {
  axios.post('http://localhost:5000/api/users', {
    firstName: firstName,
    lastName: lastName,
    emailAddress: user,
    password: password
  })
  .then(response => {
    if (response.status === 201){
      this.setState({
        validation: false,
        error:""
      })
      this.props.logIn(user, password)
    }
  })
  .then (response => {
    this.props.history.goBack()
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


First = e => { this.setState({ firstName: e.target.value }) }
Last = e => { this.setState({ lastName: e.target.value }) }
User = e => { this.setState({ user: e.target.value }) }
Pass = e => { this.setState({ password: e.target.value }) }

PassConfirm = e => { this.setState({
  confirmPass: e.target.value
})

}

handleSubmit = e => {
  e.preventDefault()
  if (this.state.password  === this.state.confirmPass) {
    this.signUp(this.state.firstName, this.state.lastName, this.state.user, this.state.password)
  }
}


// where validation.js gets the props to use to validate the info provided, and display error messages for the user based
// on those errors.
  render() {
    
          return (
              <div className="bounds">
             
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name"  onBlur={this.First} />
                            </div>
                    <div>
                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onBlur={this.Last}  />
                            </div>
                    <div>
                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address"  onBlur={this.User}  />
                      </div>
                    <div>
                    <input id="password" name="password" type="password" className="" placeholder="Password" onBlur={this.Pass}  />
                            </div>
                    <div id="confirmPasswordDiv">
                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"  onBlur={this.PassConfirm} />
                             </div>

                    <div className="grid-100 pad-bottom" ><button className="button" type="submit">Sign Up</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/userSignIn">Click here</Link> to sign in!</p>
              </div>
            </div>
          );
      }
}
//withRouter needed when using props.history.push/goBack
export default withRouter(SignUp)