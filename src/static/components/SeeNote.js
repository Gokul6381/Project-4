import React from "react";
import "../css/Edit.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeeNote = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [note, setNote] = useState("");
  useEffect(() => {
    setNote(localStorage.getItem("noteId"));

    axios
      .post("http://127.0.0.1:8000/seeNote", { data: note })
      .then((response) => setData(response.data));
  }, [note]);

  const deleteNote = async () => {
    try {
      await axios
        .post("http://127.0.0.1:8000/delete", { data: note })
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("noteId");
          navigate("/");
        });
    } catch (error) {
      console.error("Error :", error);
    }
  };
  console.log(data);
  return (
    <div className="edit">
      <h3>Notes</h3>
      <div className="box">
        <div className="data">
          <label>Title</label>
          <h2>{data.noteTitle}</h2>
        </div>

        <div className="data">
          <label>Content</label>
          <h2 id="content">{data.noteContent}</h2>
        </div>

        <div className="data">
          <label>Last Update</label>
          <h2>{data.lastUpdate}</h2>
        </div>


        <button id="delete" onClick={deleteNote}>
          Delete
        </button>
        <button onClick={(event) => navigate("/edit")}>Update</button>
      </div>
    </div>
  );
};

export default SeeNote;
