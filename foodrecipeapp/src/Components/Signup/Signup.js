import React, { Component,useEffect } from 'react'
import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = (props) => {

    const [creds, setCreds] = useState({email:"",password:"",cpassword:"",fname:"",lname:""}); 
    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }

    useEffect(() => {

      if(localStorage.getItem('token')){
        history('/');
      }


     
    }, []);
    let history = useNavigate();
    const handleSubmit = async (e) =>{

        e.preventDefault();

        const {email,password,cpassword,fname,lname} = creds ;

        if(password !== cpassword){
          //  props.showAlert(`Passwords do not match`,'danger');
          console.log('Password not matching')
            return 

        }
        e.preventDefault();
        let url = `http://localhost:3001/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({fname,lname,email,password})
          });
      
          const json =  await response.json();
          console.log(json);

          if(json.success){

            localStorage.setItem('token',json.authToken);
           // props.showAlert(`Successfully Created Account`,'success');
           console.log('Success login')
            history('/');
            

          }
          else{
            // props.showAlert(`Invalid Credentials ${json.error}`,'danger');
            console.log(json.error)
          }

    }
// export default class SignUp extends Component {
  
    return (
      <div className='signup-box'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name = "fname"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input onChange={onChange} type="text" className="form-control" placeholder="Last name" name='lname'/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            onChange={onChange}
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='cpassword'
            onChange={onChange}
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