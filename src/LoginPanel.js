import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/actions/authentication";
import {Link} from 'react-router-dom'; 
import leaf from './leaf-clipart-12-transparent.png';


const LoginPanel = (props) => {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <main className="centered middled">
      <img src={leaf} alt="img" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
        <Link to="/signup">
     <button type="button">
     Sign Up
     </button>
      </Link>
      </form>
    </main>
  );
};

export default LoginPanel;
