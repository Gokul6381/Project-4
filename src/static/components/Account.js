import React from "react";
import "../css/Account.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Account = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    };
    setData(userData);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const update = () => {
    navigate("/update");
  };

  return (
    <div className="account">
      <h3>User Details</h3>
      <div className="data">
        <label>Name</label>
        <h2>{data.name}</h2>
      </div>

      <div className="data">
        <label>Email</label>
        <h2>{data.email}</h2>
      </div>

      <button onClick={update}>Update</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Account;
