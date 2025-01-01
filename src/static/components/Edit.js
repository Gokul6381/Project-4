import React from 'react'
import "../css/Edit.css";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
     const navigate=useNavigate()
     const [status, setStatus] = useState("");
      const [user, setUser] = useState({
        noteId: "",
        title: "",
        content: ""
      });
    const [note,setNote] = useState('')

      useEffect(() => {
          const noteId = localStorage.getItem("noteId");
      
          setUser((prevUser) => ({ ...prevUser, noteId }));
        }, []);

        const loadValue = (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
          };
        
          const formSubmit = (event) => {
            event.preventDefault();
              axios
                .post("http://127.0.0.1:8000/updateNote", { data: user })
                .then((response) => setStatus(response.data));
            
          };

    useEffect(() => {
        setNote(localStorage.getItem("noteId"))
      }, []);

      const deleteNote = async () => {
        try {
          await axios.post("http://127.0.0.1:8000/delete", {data: note})
          .then(response=>{
            console.log(response.data)
            localStorage.removeItem('noteId')
            navigate('/')
          })
        } catch (error) {
          console.error("Error :", error);
        }
      };

  return (
    <div className='edit'>
         <h3>Edit Notes</h3>
      <div className="box">
        <form onSubmit={formSubmit}>
          <h3 id="status">{status}</h3>
          <div className="data">
            <label>Title</label>
            <br></br>
            <input
              type="text"
              name="title"
              placeholder="Enter Titel"
              value={user.title}
              onChange={loadValue}
            ></input>
          </div>
          <div className="data">
            <label>Content</label>
            <br></br>
            <input
              type="text"
              name="content"
              placeholder="Enter Content"
              value={user.content}
              onChange={loadValue}
              id="content"
            ></input>
          </div>
          <button id='delete' onClick={deleteNote}>Delete</button><button type="submit">Save</button>
        </form>
      </div>

      
    </div>
  )
}

export default Edit
