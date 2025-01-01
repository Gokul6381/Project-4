import React from "react";
import "../css/Login.css";

import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const[state,setState]=useState('')

  const navigate=useNavigate()


  const loadValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const formSubmit = (event) => {
    try{    
        console.log(user)
        axios.post("http://127.0.0.1:8000/loginData", { data: user })
        .then(response => {
          if(response.data.name){
          setState(response.data.status)
          localStorage.setItem('name',response.data.name)
          localStorage.setItem('email',response.data.email)
          localStorage.setItem('userLogin',true)
          navigate('/')
          }
          else{
            setState(response.data)
          }
        })
        .catch(error => console.error(error));
        
         console.log('success')
     }
     catch{
         console.error('Error')
         setState('Login Failed')
     }
     
    event.preventDefault();
  };

  return (
    <div className="login">
      <div className="box">
        <h1>Keep Notes</h1>
        <h2>{state}</h2>
        <form onSubmit={formSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Enter User Name"
            value={user.userId}
            onChange={loadValue}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Enter User Password"
            value={user.password}
            onChange={loadValue}
          ></input>
          <button type="submit">Login</button>
        </form>
        <button>
          <a href="/register">Register</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
