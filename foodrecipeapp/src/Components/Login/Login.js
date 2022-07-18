import React, { Component } from 'react'
import './Login.css';
//export default class Login extends Component {
 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [creds, setCreds] = useState({email:"",password:""});

    let history = useNavigate();

    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }


    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({email:creds.email,password:creds.password})
          });
      
          const json =  await response.json();
          console.log(json);

          if(json.success){

            localStorage.setItem('token',json.authToken);
            // localStorage.setItem('token2',json.authToken2);
            props.showAlert(`Successfully Logged In`,'success');
            history('/');

          }
          else{
            props.showAlert(`Invalid Credentials ${json.error}`,'danger');

          }

    }
  
    return (
      <div className='login-box'>
      <form className='login-form'>
        <h3>Sign In</h3>
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
      </div>
    )

}
export default Login