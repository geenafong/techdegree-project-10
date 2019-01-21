 //renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.
 import React, {Component} from 'react';
 import axios from 'axios';
 import {Link} from 'react-router-dom';
 
 class UpdateCourse extends Component {    
   constructor() {
     super();
     this.state = {
         courses:[],
         description:"",
         title:"",
         id:"",
         user:"",
         estimatedTime:"",
         isLoaded: false,
         signedIn: false
     }
   }
  //  GETS the courses
   componentWillMount() {
     axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
         .then(res => {
             this.setState({
                 user: res.user,
                 isLoaded: true,
                 courses: res.data,
                 description:res.description
             })
         }) 
        //  .then(res => {
        //    if(this.res.user._id !== this.props.user.id){
        //      this.props.history.push('/signin')
        //    }
        //  })
       }
 
  updateCourse = (title, user, email, password, description, estimatedTime,materialsNeeded) => {
     
    axios.put(`http://localhost:5000/api/courses/${this.props.id}`,{
        title:title,
        description:description,
        estimatedTime:estimatedTime,
        materialsNeeded:materialsNeeded,
    }, localStorage.getItem('auth')
    ) .then(res =>{
      if(res.status === 204 || res.status === 304) {
        console.log(this.state.title)
        this.props.history.push(`/courses/${this.props.id}`)
      }
    }).catch(err =>{
        console.log(err);
      }) 
    }
  
    handleChange = e => {
      this.setState({[e.target.id]: e.target.value});
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.updateCourse(this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded)
    }

 render() {
     return (
       <div className="bounds course--detail">
         <h1>Update Course</h1>
         <div>
         <form onSubmit={this.handleSubmit}>
             <div className="grid-66">
               <div className="course--header">
                 <h4 className="course--label">Course</h4>
                 <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                     defaultValue={this.state.courses.title}></input></div>
                 <p>{(this.state.courses.user) ? this.state.courses.user.firstName + " " + this.state.courses.user.lastName : "Instructor Not Listed"}</p>
               </div>
               <div className="course--description">
               <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange} value={this.state.courses.description}></textarea></div>
               </div>
             </div>
             <div className="grid-25 grid-right">
               <div className="course--stats">
                 <ul className="course--stats--list">
                   <li className="course--stats--list--item">
                     <h4>Estimated Time</h4>
                     <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.handleChange} defaultValue={this.state.courses.estimatedTime} /></div>
                   </li>
                   <li className="course--stats--list--item">
                     <h4>Materials Needed</h4>
                     <div><textarea id="materialsNeeded" name="materialsNeeded" type="text" className="" placeholder="List materials..." onChange={this.handleChange} value={this.state.courses.materialsNeeded}></textarea></div>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button>
             <Link className="button button-secondary" to={`/courses`}>Cancel</Link></div>
           </form>
         </div>
       </div>
     );
   }
 };
 
 export default UpdateCourse;