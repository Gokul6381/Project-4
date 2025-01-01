import React from "react";

import "../css/Notes.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notes = () => {
  const navigate=useNavigate()
  const [status, setStatus] = useState("");
  const [user, setUser] = useState({
    userName: "",
    title: "",
    content: ""
  });

  useEffect(() => {
    const userName = localStorage.getItem("name");

    setUser((prevUser) => ({ ...prevUser, userName }));
  }, []);



  const loadValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (user.userName){ 
    axios
        .post("http://127.0.0.1:8000/notes", { data: user })
        .then((response) => setStatus(response.data));
      } 
      else{
        navigate("/login")
      }
  };

  return (
    <div className="notes">
        <h3>Write New Notes</h3>
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
              required
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
              required
            ></input>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
