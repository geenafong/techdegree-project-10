 //renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class UpdateCourse extends Component {    
  constructor() {
    super();
    this.state = {
        courses:[],
        description:"",
        title:"",
        user:"",
        estimatedTime:"",
        isLoaded: false,
        signedIn: false
    }
  }
  
  componentDidMount() {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                isLoaded: true,
                courses: res.data
            })
        });
  };


render() {
    console.log(this.state.courses.description)
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    defaultValue={this.state.courses.title}></input></div>
                <p>{(this.state.courses.user) ? this.state.courses.user.firstName + " " + this.state.courses.user.lastName : "Instructor Not Listed"}</p>
              </div>
              <div className="course--description">
              <div><textarea id="description" type="text" name="description" placeholder="Course description..." defaultValue={this.state.courses.description}/></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={this.state.courses.estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" type="text" className="" placeholder="List materials..." defaultValue={this.state.courses.materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button>
            <Link className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</Link></div>
          </form>
        </div>
      </div>
    );
  }
};

export default UpdateCourse;