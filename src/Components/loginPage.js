import './loginPage.css';
import profile from "./../image/img1.png";
import email from "./../image/img2.jpg";
import pass from "./../image/img3.png";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(JSON.stringify({
      email: email, password: password
    }));
    axios.post("http://localhost:6965/login",{
      email: email, password: password
    }).then(function (response) {
      console.log("response");
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
            <h1>Login</h1>
            <div>
              <img src={email} alt="email" className="email"/>
              <input type="text" placeholder="Email" className="name" onChange={(e) => this.setState({ email : e.target.value })}/>
            </div>
            <div className="second-input">
              <img src={pass} alt="pass" className="email"/>
              <input type="password" placeholder="Password" className="name" onChange={(e) => this.setState({ password : e.target.value })}/>
            </div>
            <div className="login-button">
            <button type="submit">Login</button>
            </div>
            
            
              <p className="link">
                <a href="#">Forgot password ?</a> Or <Link className="nav-link" to={'/sign-up'}>Sign up</Link>
              </p>
            
  
          </div>
        </div>
        

      </div>
      </div>
      </form>
    );
}

}