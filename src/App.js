import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/chat"
          element={
            token ? <Chat token={token} onLogout={onLogout} /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={token ? "/chat" : "/signup"} />} />
      </Routes>
    </Router>
  );
};

export default App;

