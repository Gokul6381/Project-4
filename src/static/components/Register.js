import React from "react";
import "../css/Register.css";

import axios from 'axios'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate()

  const [status, setStatus] = useState('');
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });

  const loadValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    if (user.password !== user.repass) {
        setStatus('Re-cheek Your Password...')          
      }
    else{
      axios.post('http://127.0.0.1:8000/registerData',{data:user})
      setStatus('Register Successfully...')
      navigate('/login')
    }
  };


  return (
    <div className="register">
      <div className="box">
      <h1>Keep Notes</h1>
      <h2>{status}</h2>
      <form method="post" onSubmit={formSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={user.name}
          onChange={loadValue}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Enter Email Id"
          value={user.email}
          onChange={loadValue}
          required
        ></input>
        
        <input
          type="password"
          name="password"
          minLength="8" 
          maxLength="16"
          placeholder="Enter User Password"
          value={user.password}
          onChange={loadValue}
          required
        ></input>
        <input
          type="password"
          name="repass"
          placeholder="Re-Enter User Password"
          value={user.repass}
          onChange={loadValue}
          required
        ></input>
        <button type="submit">Register</button>
      </form>
      <button>
        <a href="/login">Login</a>
      </button>
      </div>
    </div>
  );
};

export default Register;
