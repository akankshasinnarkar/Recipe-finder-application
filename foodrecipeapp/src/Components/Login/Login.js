import React, { Component,useEffect } from 'react'
import './Login.css';
//export default class Login extends Component {
 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';


const Login = (props) => {

    const [creds, setCreds] = useState({email:"",password:""});

    let history = useNavigate();

    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }

    useEffect(() => {

      if(localStorage.getItem('token')){
        history('/');
      }


     
    }, []);


    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let url = `http://localhost:3001/login`;
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

            console.log("valid  login !!!!! ")
            history('/');

          }
          else{
             props.showAlert(`Invalid Credentials ${json.error}`,'danger');

            console.log("Invalid login ")

          }

    }
  
    return (
      <div className='login-box'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            
            placeholder="Enter password"
            onChange={onChange}
            name="password"
          />
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
        
      </form>
      </div>
    )

}
export default Login