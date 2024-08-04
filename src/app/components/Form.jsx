import React, { useState } from 'react';
import axios from 'axios';
import Formstyles from "../../app/styles/Form.module.css";

const Form = ({ type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { username, password };

      if (type === 'signup') {
        data.email = email;
        data.number = number;
        data.confirmpassword = confirmPassword;
      }

      const endpoint = type === 'signup' ? '/api/USERS/register' : '/api/USERS/login';

      const response = await axios.post(endpoint, data);
      console.log(response.data);

      if (response.data.status === 1) {
        alert(`${type === 'signup' ? 'User registration' : 'User login'} successful`);
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`${type === 'signup' ? 'User registration' : 'User login'} unsuccessful`);
    }
  };

  return (
    <div>
      <form className={Formstyles.formcontainer} onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className={Formstyles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        {type === 'signup' && (
          <>
            <label>Email</label>
            <input
              className={Formstyles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Number</label>
            <input
              className={Formstyles.input}
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
          </>
        )}

        <label>Password</label>
        <input
          className={Formstyles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        {type === 'signup' && (
          <>
            <label>Confirm Password</label>
            <input
              className={Formstyles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
          </>
        )}

        <button className={Formstyles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
