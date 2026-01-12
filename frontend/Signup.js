import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",confirmpassword:""})
  let navigate=useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email.trim(),
        password: credentials.password,
        confirmpassword:credentials.confirmpassword
      })
    });
     
    if(credentials.confirmpassword===credentials.password){
      const json = await response.json();
    console.log("Login Response:", json);
      if(json.success){
        localStorage.setItem('token',json.authtoken);
       navigate("/");
        props.showalert("Account created successfully","success")
      }
    
    else{
      props.showalert("user with this email id already exists","danger")
    }
    }
    else{
      props.showalert("passwords are not matching","danger")
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div>
      <h1 className='py-3'>Create a new account</h1>
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required/>
  </div>
   <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Enter Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={8} required/>
  </div>
  <div className="mb-3">
    <label for="confirmpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirmpassword" name='confirmpassword'onChange={onChange} minLength={8} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}
