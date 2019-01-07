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

class App extends Component {
    render() {
        return(
            <BrowserRouter>
              <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Courses}/>                   
                    <Route exact path='/signin' component={UserSignIn} />
                    <Route exact path='/signup' component={UserSignUp} />
                    <Route exact path='/courses/create' component={CreateCourse} />
                    <Route exact path='/courses/:id' component={CourseDetails} />
                    <Route exact path='/courses/:id/update' component={UpdateCourse} />

                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}

export default App;