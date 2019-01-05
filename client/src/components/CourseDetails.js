import React from 'react';
import {Link} from 'react-router-dom';

class CourseDetails extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title:"",
            courses:"",
            loading: false,
            signedIn: false
        }
    }


    
    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.detail}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    courses: json
                });
            });
    };
    
  render(){
    return (
        <div className="grid-33">
          <Link className="course--module course--link" to={`/courses/${this.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{this.title}</h3>
          </Link>
        </div>
    );
  }
}

export default CourseDetails;