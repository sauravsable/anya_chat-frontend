import React, { useState } from "react";
import {login} from '../api'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem("authToken", data.jwt);
      localStorage.setItem("userId",data?.user?.documentId);
      setToken(data.jwt);
      navigate('/chat');
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
