import logo from './static/images/logo.png';
import './App.css';

import { useState,useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark,faBars} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";


function App() {
  const [dot, setDot] = useState(false);
  const [data,setData]=useState(false)

  useEffect(()=>{
    const user=(localStorage.getItem('name'))
    if (user){
      setData(true)
    }
    else{
      setData(false)
    }
  },[])




  return (
    <div className="App">
      <div className='header'>
        <div className='left'>
          <img src={logo} alt='logo'></img>
          <h1>Keep Notes</h1>
        </div>
        <div className="right">
          <h3>
            <a href="/">Home</a>
          </h3>
          <h3>
            <a href="notes">Notes</a>
          </h3>
          <h3>
            <a href="account">Account</a>
          </h3>
          <h3>
            { data ? (<></>) : (<a href="login">Login</a>) }
          </h3>
        </div>
        <div className='bar'>
        {dot ?(<></>) : (<h1 onClick={()=>{setDot(true)}}><FontAwesomeIcon icon={faBars} /></h1>) }
        
        </div>
        {dot && (<div className='pop'>
        <h1 onClick={()=>{setDot(false)}}><FontAwesomeIcon icon={faCircleXmark} /></h1>
        <h3>
            <a href="/">Home</a>
          </h3>
          <h3>
            <a href="notes">Notes</a>
          </h3>
          <h3>
            <a href="account">Account</a>
          </h3>
          <h3>
            { data ? (<></>) : (<a href="login">Login</a>) }
          </h3>
        </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
