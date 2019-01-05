import React from 'react';
import {Link} from 'react-router-dom';

// Defines the Courses class/function
class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        courses:[],
        isLoaded: false,
        signedIn: false
    }
  }
    //Instantiates network request 
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                courses: json
            });
        });
};

  render() {
    //Renders a JavaScript exression in JSX
    let {isLoaded, courses} = this.state;
        return (
          <div>
          {courses.map(course=>(
            <div className="bounds">
             <div className="grid-33">
              <Link to={`/courses/${course._id}`} className="course--module course--link"></Link>;
              <h3 className="course--label">Course</h3>
              <h4 className="course--title">{course.title}</h4>
            </div>
          </div>
          ))}
                 
          <div className="grid-33">
            <a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
            </a>
             </div>
           </div>
        );
  };
};

export default Courses;