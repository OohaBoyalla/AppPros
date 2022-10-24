import './signup.css';
import profile from "./../image/img1.png";
import email from "./../image/img2.jpg";
import pass from "./../image/img3.png";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { Component, useEffect } from "react";

// useEffect(() => {
//   const loggedInUser = localStorage.getItem("user");
//   if (loggedInUser) {
//     const foundUser = JSON.parse(loggedInUser);
//   }
// }, []);

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    const loggedInUser = localStorage.getItem("user");
    
    this.state = {
      name: "",
      age: "",
      email: "",
      password: "",
      imageurl:""
    };

    if (loggedInUser) {
      this.state = JSON.parse(loggedInUser);
    } else {
      window.location.href = '/sign-in';
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };
  
  handleSubmit(e) {
    e.preventDefault();
    const { name, age, email, password , imageurl} = this.state;
    console.log(JSON.stringify({
      name: name,
      email: email,
      age: age,
      password: password,
      imageurl: imageurl
    }));
    axios.put("http://localhost:6965/update",{
      name: name,
      email: email,
      age: age,
      password: password,
      imageurl: imageurl
    }).then(function (response) {
      console.log("--------------------------------")
      localStorage.setItem("user", JSON.stringify({
        name: name,
        email: email,
        age: age,
        password: password,
        imageurl: imageurl
      }));
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <div className="main">
           <div className="sub-main">
             <div>
               <div className="imgs">
                 <div className="container-image">
                   <img src={this.state.imageurl} alt="profile" className="profile"/>
                 </div>
      
               </div>
               <div>
                 <h1>Profile</h1>
                 <div>
                   <img src={email} alt="name" className="email"/>
                   <input type="text" value={this.state.name} placeholder="Name" className="name" onChange={(e) => this.setState({ name : e.target.value })}/>
                 </div><br></br>
                 <div>
                   <img src={email} alt="email" className="email"/>
                   <input type="text" value={this.state.email} placeholder="Email" className="name" onChange={(e) => this.setState({ email : e.target.value })}/>
                 </div><br></br>
                 <div>
                   <img src={email} alt="age" className="email"/>
                   <input type="text" value={this.state.age} placeholder="Age" className="name" onChange={(e) => this.setState({ age : e.target.value })}/>
                 </div> <br></br>
                 <div>
                   <img src={email} alt="image" className="email"/>
                   <input type="text" value={this.state.imageurl} placeholder="Profile Image Url" className="name" onChange={(e) => this.setState({ imageurl : e.target.value })}/>
                 </div>
                 <div className="second-input">
                   <img src={pass} alt="pass" className="email"/>
                   <input type="password" value={this.state.password} placeholder="Password" className="name" onChange={(e) => this.setState({ password : e.target.value })}/>
                 </div>
                <div className="login-button">
                <button type="submit">Update</button>
                </div><br></br>
                <div>
                  <button onClick={this.handleLogout}>Logout</button>
                </div>
       
               </div>
             </div>
             
      
           </div>
          </div>
        </form>
        );
  }
}