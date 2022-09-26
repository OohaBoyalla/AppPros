import './signup.css';
import profile from "./../image/img1.png";
import email from "./../image/img2.jpg";
import pass from "./../image/img3.png";
function Signup() {
  return (
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Signup Page</h1>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" placeholder="user name" className="name"/>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="password" className="name"/>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="re-enter password" className="name"/>
           </div>
          <div className="login-button">
          <button>Register</button>
          </div>
           
            <p className="link">
              <a>Already have account?</a><a href="#">Log in</a>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default Signup;