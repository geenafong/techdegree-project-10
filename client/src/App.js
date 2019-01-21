import React, { Component } from 'react';
import {BrowserRouter, 
        Route, 
        Switch,
        Redirect} from 'react-router-dom';
import './App.css';
import "./global.css";
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut'
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import {Provider} from './components/Context';
import axios from "axios";
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
    //establishes the state of the component when no one is signed in
    state= {
        user:'',
        password:'',
        courses: [],
        currentUser:false,
        signedIn:false,
        currentUser: false,
        currUser: false,
        isAuthenticated:false
    }
    
    //creates a method called signIn that gets the user's credentials and stores it in a local database that is used to check for authorization
    signIn = (history, email, password) => {
     axios.get('http://localhost:5000/api/users', {
        auth: {
            username: email, 
            password: password
        },
        
    })
    .then(response => {
        //enters users info into a local database to be used for authentication
        if(response.status === 200 || response.status ===304) {
            
            localStorage.setItem('id', response.data._id);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('emailAddress', response.emailAddress);
            localStorage.setItem('password', response.data.password);
            
            let id = localStorage.getItem('id');
            let firstName = localStorage.getItem('firstName');
            let lastName = localStorage.getItem('lastName');
            let email = localStorage.getItem('emailAddress');
            let password = localStorage.getItem('password');
            
            //sets the state for the user when signed in
            this.setState({
                user:response.data,
                id,
                firstName,
                lastName,
                email,
                password,
                signedIn:true,
                isAuthenticated:true,
                currUser:true,
                validUser:true

            });
            
            //when signed in, brings user back to the page they
            history.goBack('/');
        }
        //when a user is not in the user database, state is changed to false and they do not log in
        }) .catch(err => {
                if(err) {
                    this.setState({
                        signedIn:false,
                    });
                    console.log(err);
                }
            })
        }
      //a method used to remove the authenticated user and password from the global state
      signOut = () => {
        this.setState({
          user: '',
          signedIn: false,
          isAuthenticated:false
        });
        localStorage.clear();
      }
      componentDidMount() {
        if(localStorage.user){
          let user = JSON.parse(localStorage.getItem('user'))
          this.signIn(user.emailAddress, user.password)
        }
    }
    render() {
            let id = localStorage.getItem('id');
            let firstName = localStorage.getItem('firstName');
            let lastName = localStorage.getItem('lastName');
            let email = localStorage.getItem('emailAddress');
            let password = localStorage.getItem('password');
            let user = { id, firstName,lastName, email, password }
        return(
            //the authenticated user and the user sign in and sign out methods are defined using a Context API <Provider> component
             <Provider value={{
                    user:this.state.user,
                    firstName:this.state.firstName,
                    password:this.state.password,
                    isAuthenticated:this.state.isAuthenticated,
                    signedIn:this.state.signedIn,
                  actions: {
                    signIn:this.signIn
                  }
              }}
              >
              <BrowserRouter>
                    <div>
                    <Route path="/" render={() => <Header signOut={this.signOut}/>}/>
                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to='/courses'/>} />
                        <Route exact path="/courses" render={ () => <Courses />}/>
                        <Route exact path="/signin" render={ () => <UserSignIn signIn={this.signIn} />}/>    
                        <Route exact path='/signup' component={UserSignUp} />
                        <Route exact path='/courses/create' render= {() => <CreateCourse user={user}/>}/>
                        <Route exact path='/courses/:id' render={ ({match}) => <CourseDetails id={match.params.id} />}/>
                        <PrivateRoute exact path='/courses/:id/update' component = {UpdateCourse} user={this.state.user}/>                       
                        <Route exact path='/signout' render={() => <UserSignOut signOut={this.signOut} /> } />
                    </Switch>
                    </div>
              </BrowserRouter>
            </Provider>
        );
    }
}

export default App;