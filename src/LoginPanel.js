import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/actions/authentication";

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
      </form>
    </main>
  );
};

export default LoginPanel;
