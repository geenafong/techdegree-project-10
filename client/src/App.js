import React, { Component } from 'react';
import {BrowserRouter, 
        Route, 
        Switch} from 'react-router-dom';
import './App.css';
import "./global.css";
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import {Provider} from './components/Context';
import axios from "axios";

class App extends Component {
    state= {
        user:'',
        password:'',
        courses: [],
        signedIn:true,
    }
    
    signIn = (history, email, password) => {
     axios.get('http://localhost:5000/api/users', {
        auth: {
            username: email, 
            password: password
        }
    })
    .then(response => {
        //Enters users info into a local database to be used for authentication
        if(response.status === 200) {
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

            this.setState({
                user: {
                    signedIn:true,
                    id,
                    firstName,
                    lastName,
                    email,
                    password
                }
                
            })
            history.goBack();
        }
    }) .catch(err => {
            if(err.response.status === 401) {
                this.setState({
                    signedIn:false,
                });
                console.log(err);
            }
        })
      }
    render() {
            let id = localStorage.getItem('id');
            let firstName = localStorage.getItem('firstName');
            let lastName = localStorage.getItem('lastName');
            let email = localStorage.getItem('emailAddress');
            let password = localStorage.getItem('password');
            let user = { id, firstName,lastName, email, password }
            console.log(user.firstName)

        return(
            <BrowserRouter>
             <Provider
              value={{
                  user:this.state.user,
                  firstName:this.state.firstName,
                  password:this.state.password,
                  signedIn:this.state.signedIn,
              }}
              >
                <Switch>
                    <Route path="/" render={() => <Header user={user} firstName={firstName} signOut={this.signOut}/>}/>
                    <Route path="/" render={ props => <Courses user={user}/>}/>
                    <Route exact path="/signin" render={ props => <UserSignIn signIn={this.signIn} history={props.path}/>}/>                    <Route exact path='/signup' component={UserSignUp} />
                    <Route exact path='/courses/create' render= {props => <CreateCourse user={user}/>}/>
                    <Route exact path='/courses/:id' component={CourseDetails}/>
                    <Route exact path='/courses/:id/update' render={ props => <UpdateCourse user={user}/>}/>

                </Switch>
              </Provider>
            </BrowserRouter>
        );
    }
}

export default App;