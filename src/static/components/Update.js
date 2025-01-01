import React from 'react'

import "../css/Update.css";

import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const navigate=useNavigate()
  const [status, setStatus] = useState("");
  const [user, setUser] = useState({
    userName:"",
    name: "",
    email: "",
    password: "",
    repass: "",
  });

    useEffect(() => {
      const userName=localStorage.getItem('name')
  
      setUser((prevUser) => ({ ...prevUser, userName })); 
    }, []);
  

  const loadValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    if (user.password !== user.repass) {
      setStatus("Re-cheek Your Password...");
    } else {
      axios.post("http://127.0.0.1:8000/update", { data: user })
      .then(response=>setStatus(response.data))
    }
  };


  return (
    <div className='update'>
        <form onSubmit={formSubmit}>
        <h3 id="status">{status}</h3>
      <div className="data">
            <label>Name</label><br></br>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={user.name}
              onChange={loadValue}
              required
            ></input>
          </div>
          <div className="data">
            <label>Email</label><br></br>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Id"
              value={user.email}
              onChange={loadValue}
              required
            ></input>
            </div>
            <div className="data">
            <label>Password</label><br></br>
            <input
              type="password"
              name="password"
              minLength="8"
              maxLength="16"
              placeholder="Enter New Password"
              value={user.password}
              onChange={loadValue}
              required
            ></input><br></br>
            <input
              type="password"
              name="repass"
              placeholder="Re-Enter New Password"
              value={user.repass}
              onChange={loadValue}
              required
            ></input>
          </div>
          <button onClick={()=>{navigate('/')}}>Back</button>
          <button type="submit">Register</button>

          </form>
    </div>
  )
}

export default Update
