import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from './store/actions/authentication';
import { createInstance } from './store/actions/history';
import {Link} from 'react-router-dom'; 
import leaf from './leaf-clipart-12-transparent.png';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cashValue, setCashValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
        name,
        email,
        cashValue,
      password,
      confirmPassword,
    };
    
    await dispatch(signUp(newUser));

    const deposit = cashValue;
    const payload ={
      deposit
    };
    await dispatch(createInstance(payload));

   
  };

  return (
    <main className="centered middled">
      <img src={leaf} alt="img" />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={updateProperty(setName)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateProperty(setEmail)}
          required
        />
         <input
          type="number"
          placeholder="Deposit Amount"
          required
          value={cashValue}
          onChange={updateProperty(setCashValue)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={updateProperty(setConfirmPassword)}
        />
        <button type='submit'>Sign Up</button>
        <Link to="/login">
          <button type="button">
          Log in
          </button>
        </Link>
      </form>
    </main>
  );
};

export default SignUpForm;