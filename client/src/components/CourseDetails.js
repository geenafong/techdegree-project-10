import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
    console.log(this.state.courses)
    let materialsNeededIndiv;
    let materialsList;
    let removeEmptyString;
    if(this.state.courses.materialsNeeded){
      let materialsNeeded= this.state.courses.materialsNeeded;
      materialsNeededIndiv = materialsNeeded.split('*');
      removeEmptyString = materialsNeededIndiv.shift();
      materialsList = materialsNeededIndiv.map((materialsNeededIndiv, index) =>(
        <li key={index}>{removeEmptyString}</li>
      ))
    } 
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
              <h3 className="course--label">Course</h3>
              <h4 className="course--title">{this.state.courses.title}</h4>
              <p>By: {(this.state.courses.user) ? this.state.courses.user.firstName + " " + this.state.courses.user.lastName : "Instructor Not Listed"} </p>
            </div>
            <div className="course--description">
            {this.state.courses.description}
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
                    {(materialsNeededIndiv) ? materialsList : <li> No materials listed </li>}
                    
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