import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  sessionStorage.setItem("level", 2);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);
    console.log(userName);

    try {
      const res = await axios.get(`http://localhost:8800/login/${userName}`);
      setUser(res.data);

      const store = res.data;
      const PW = store.Password;
      if (PW === password) {
        sessionStorage.setItem("User_ID", store.User_ID);
        sessionStorage.setItem("User_Name", store.User_Name);

        if (store.User_LEVEL_ID === 3) {
          sessionStorage.setItem("level", 3);
          navigate("/AgentDashboard");
        } else if (store.User_LEVEL_ID === 4) {
          sessionStorage.setItem("level", 4);
          navigate("/AdminDashboard");
        } else {
          navigate("/UserDashbord");
        }
      } else {
        setLoginError("User Name or Password is incorrect");
        setPassword("");
        setUserName("");
      }
    } catch (err) {
      console.log(err);
      setLoginError("login error");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <form onSubmit={HandleSubmit}>
          <h1>Login</h1>
          <div className="mb-3">
            <label htmlFor="user_id">User Name:</label>
            <input
              type="username"
              placeholder="Enter User Name"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value) || setLoginError("")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value) || setLoginError("")}
            />
          </div>

          <button className="btn" onClick={HandleSubmit}>
            Login
          </button>
          {loginError && <p className="text-danger">{loginError}</p>}
        </form>
        <div className="msg">
          If you are facing difficuties while login, contact your administration
        </div>
      </div>
    </div>
  );
}

export default Login;
