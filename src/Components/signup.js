import './signup.css';
import profile from "./../image/img1.png";
import email from "./../image/img2.jpg";
import pass from "./../image/img3.png";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import React, { Component } from "react";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: "",
      password: "",
      imageurl:"google"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
    axios.post("http://localhost:6965/register",{
      name: name,
      email: email,
      age: age,
      password: password,
      imageurl: imageurl
    }).then(function (response) {
      console.log("--------------------------------")
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
                   <img src={profile} alt="profile" className="profile"/>
                 </div>
      
               </div>
               <div>
                 <h1>Signup</h1>
                 <div>
                   <img src={email} alt="name" className="email"/>
                   <input type="text" placeholder="Name" className="name" onChange={(e) => this.setState({ name : e.target.value })}/>
                 </div><br></br>
                 <div>
                   <img src={email} alt="email" className="email"/>
                   <input type="text" placeholder="Email" className="name" onChange={(e) => this.setState({ email : e.target.value })}/>
                 </div><br></br>
                 <div>
                   <img src={email} alt="age" className="email"/>
                   <input type="text" placeholder="Age" className="name" onChange={(e) => this.setState({ age : e.target.value })}/>
                 </div>
                 <div className="second-input">
                   <img src={pass} alt="pass" className="email"/>
                   <input type="password" placeholder="Password" className="name" onChange={(e) => this.setState({ password : e.target.value })}/>
                 </div>
                <div className="login-button">
                <button type="submit">Register</button>
                </div>
                 
                  <p className="link">
                    <a>Already have account?</a><Link className="nav-link" to={'/sign-in'}>Log in</Link>
                  </p>
                 
       
               </div>
             </div>
             
      
           </div>
          </div>
        </form>
        );
  }
}