// import React,{useContext, useEffect, useState} from 'react'
// import notecontext from '../context/notes/NoteContext'
// export default function Login() {
//   const [credentials,setcredentials]=useState({email:"",password:""})
//   const handlesubmit=async (e)=>{
//       e.preventDefault();
//        const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
       
//       },
//       body:JSON.stringify({email:credentials.email,password:credentials.password})
//     });
//     const json=await response.json()
//     console.log(json);
//   }
//    const onchange=(e)=>{
//     setcredentials({...credentials,[e.target.name]:e.target.value})
//    }
//   return (
//     <>
//     <div>
//       <form onSubmit={handlesubmit}>
//     <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               aria-describedby="emailHelp"
//               value={credentials.email}
//               onChange={onchange}
//             />
//           </div>
//   <div class="mb-3">
//     <label for="password" class="form-label">Password</label>
//     <input type="password" class="form-control" id="password" name='password'/>
//   </div>
//   <div class="mb-3 form-check">
//     <input type="checkbox" class="form-check-input" id="exampleCheck1" value={credentials.password}/>
//     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
//   <button type="submit" class="btn btn-primary" onChange={onchange} >Submit</button>
// </form>
//     </div>
//     </>
//   )
// }
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
export default function Login(props) {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate= useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log("Login Response:", json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
       navigate("/");
       props.showalert("Sucessfully logged in","success")
    }
    else{
      props.showalert("Invalid credentials","danger")
    }
  };

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className='py-3'>Login to continue to Inotebook</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
          />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}


