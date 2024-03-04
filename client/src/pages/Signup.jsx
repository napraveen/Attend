import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Signup.css';
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-right',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3050/api/auth/signup',
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: '',
      username: '',
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Signup Account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="signup-email"
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          <br />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="signup-username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="signup-password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          <br />
          <button type="submit" className="signup-submit">
            Submit
          </button>
          <br />
          <br />
          <br />
          <p className="signup-gotologin">
            Already have an account? <Link to={'/login'}>Login</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
