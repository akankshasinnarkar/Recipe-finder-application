import React, { Component } from 'react'
import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = (props) => {

    const [creds, setCreds] = useState({email:"",password:"",cpassword:"",name:""}); 
    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }

    let history = useNavigate();
    const handleSubmit = async (e) =>{

        e.preventDefault();

        const {name,email,password,cpassword} = creds ;

        if(password !== cpassword){
            props.showAlert(`Passwords do not match`,'danger');
            return 

        }
        e.preventDefault();
        let url = `http://localhost:5000/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({name,email,password})
          });
      
          const json =  await response.json();
          console.log(json);

          if(json.success){

            localStorage.setItem('token',json.authToken);
            props.showAlert(`Successfully Created Account`,'success');
            history('/');
            

          }
          else{
            props.showAlert(`Invalid Credentials ${json.error}`,'danger');
          }

    }
// export default class SignUp extends Component {
  
    return (
      <div className='signup-box'>
      <form className='signup-form'>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
      </div>
    )
  
}
export default SignUp