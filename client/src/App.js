import React, { Component } from 'react';
import {BrowserRouter, 
        Route, 
        Switch} from 'react-router-dom';

import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            courses: [],
            loading: false,
            signedIn: false
        }
    };

    render() {
        return(
            <BrowserRouter>
              <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Courses} />
                    <Route exact path='/signin' component={UserSignIn} />
                    <Route exact path='/signup' component={UserSignUp} />

                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}

export default App;