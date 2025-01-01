import React from 'react'
import "../css/Home.css";

import { useState, useEffect } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";


const Home = () => {
    const navigate=useNavigate()
    const [data,setData] = useState([])
    useEffect(() => {
        const userName = localStorage.getItem("name");

        
        const fetchData = async () => {
          try {
            await axios.post("http://127.0.0.1:8000/home", {data: userName})
            .then(response=>{
              setData(response.data.notes)
            })
          } catch (error) {
            console.error("Error fetching history:", error);
          }
        };
        if (userName){
        fetchData();}
      }, []);
    
      console.log(data)
  return (
    <div className='home'>
      <div className='box'>
        {data.length>0 ?(<div className='datas'>
          <h1>Notes</h1>
          {data.map((item,index) => (
              <table key={index}> 
                <tbody>
                  <tr>
                    <td id='no'><h2>{index+1}</h2></td>
                    <td><h2>{item.noteTitle}</h2></td>
                    <td><h2>{item.lastUpdate}</h2></td>
                    <td><button type="button" onClick={(event)=>{localStorage.setItem('noteId',item.id); navigate("/seeNote") }}>Select</button></td>

                  </tr>
                </tbody>
              </table>
              ))}
          <button onClick={(event)=>navigate('/notes')}>Add</button>
        </div>) : (<div className='noData'>
          <h1><FontAwesomeIcon icon={faPenToSquare} /></h1>
          <h2>Add Your Notes</h2>
          <button onClick={(event)=>navigate('/notes')}>Add</button>
        </div>)}
      </div>
        
    </div>
  )
}

export default Home
