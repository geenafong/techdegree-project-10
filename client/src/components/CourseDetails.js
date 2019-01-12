import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetails extends React.Component {    
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
    
    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    courses: res.data
                })
            });
    };

    deleteCourse = () => {
         axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
    }
    
  render(){
   return (
    <div>
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          <span>
            <Link className="button" to={`${this.props.match.params.id}/update`}>Update Course</Link>
            <button className="button" onClick={this.deleteCourse}>Delete Course</button>
          </span>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
           
          <div className="bounds course--detail">

          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.courses.title}</h3>
              <p>By: {(this.state.courses.user) ? this.state.courses.user.firstName + " " + this.state.courses.user.lastName : "Instructor Not Listed"} </p>
            </div>
            <div className="course--description">
            <ReactMarkdown>{this.state.courses.description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{(this.state.courses.estimatedTime) ? this.state.courses.estimatedTime : "Estimated Time not specified"}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                  <ReactMarkdown>{this.state.courses.materialsNeeded}</ReactMarkdown>
                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
         </div>
        </div>
    );
  }
}

export default CourseDetails;