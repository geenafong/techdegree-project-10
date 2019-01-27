import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

//This component provides the "Create Course" screen by rendering a form that allows a user to create a new course.
class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
        user:"",
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        isLoaded: false,
        signedIn: false,
        id:""
    }
  }
   //method for a POST request to update all of the changes that are made
   createCourse = (id, title, description, estimatedTime,materialsNeeded) => {
    axios.post(`http://localhost:5000/api/courses/`,{
      title:title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
         
     }, {  
     headers:{
      'Authorization': JSON.parse(window.localStorage.getItem('auth'))
        }  
  }).then(res =>{
          this.props.history.push(`/courses`);
      }).catch(err =>{
        console.log(err);
      }) 
    }
    handleChange = e => {
      this.setState({[e.target.id]: e.target.value});
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.createCourse(this.state.id, this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded)
    }
  render() {
    //checks to see if there is a valid title/description
      let titleError = '';
      let descError = '';

        if(this.state.title.length === 0){
          titleError = <li>Please provide a value for "Title"</li>
        } 
        if(this.state.description.length === 0){
          descError = <li>Please provide a value for "Description"</li>
        } 
        
    return (
        <div className="bounds course--detail">
         <h1>Create Course</h1>
         <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {titleError}
                {descError}
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onBlur={this.handleChange}></input></div>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onBlur={this.handleChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div> <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" onBlur={this.handleChange}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onBlur={this.handleChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button>
            <Link to="/courses"><button className="button button-secondary">Cancel</button></Link></div>
          </form>
        </div>
      </div>
      );
    }
};

export default withRouter (CreateCourse);