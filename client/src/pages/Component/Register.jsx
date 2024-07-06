import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [Error1, setError1] = useState("");
  const [FName, setFName] = useState("");
  const [Error2, setError2] = useState("");
  const [LName, setLName] = useState("");
  const [Pw, setPw] = useState("");
  const [Error3, setError3] = useState("");
  const [C_Pw, setCPw] = useState("");
  const [Bdate, setBdate] = useState();
  const [SigninError, setSigninError] = useState("");
  var ID = false;
  if (sessionStorage.getItem("User_ID") == 1) {
    ID = true;
  }
  const navigate = useNavigate();
  // const ID = sessionStorage.getItem("User_ID");

  async function handleConfirm() {
    try {
      const res = await axios.get("http://localhost:8800/Users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
    if (userName === "" || FName === "" || Pw === "") {
      setSigninError("Registration Error");
      if (userName === "") {
        setError1("fill this field");
      }
      if (FName === "") {
        setError2("fill this field");
      }
      if (Pw === "") {
        setError3("fill this field");
      }
    } else if (Pw === C_Pw) {
      try {
        // const Usr = await axios.post(
        //   `http://localhost:8800/register/${FName}/${LName}/${Bdate}/${userName}/${Pw}`
        // );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSigninError("Passwords doesn't match. please reconfirm your password");
    }
  }

  return (
    <div className="register-card">
      <div className="register-card-0">
        <h1>Register</h1>
        <div className="input-box-0">
          <div className="tag">
            <line>Username</line>
          </div>
          <div>
            <input
              className="input-long"
              type="username"
              placeholder="Enter a username"
              value={userName}
              required
              onChange={(e) =>
                setUserName(e.target.value) ||
                setError1("") ||
                setSigninError("")
              }
            ></input>
            {Error1 && <p className="text-danger">{Error1}</p>}
          </div>
        </div>
        <div className="select-box">
          {(ID && (
            <select
              className="select"
              placeholder="select your registration role"
            >
              <option value="first">Register as a User</option>
              <option value="second">Register as a User Agent</option>
            </select>
          )) || (
            <select className="select">
              <option value="second">Register as a User Agent</option>
            </select>
          )}
        </div>
        <div className="input-box">
          <div className="input-box-1">
            <div className="tag">
              <line>First Name</line>
            </div>
            <div>
              <input
                className="input-short"
                type="text"
                placeholder="Enter your first name"
                value={FName}
                onChange={(e) =>
                  setFName(e.target.value) ||
                  setError2("") ||
                  setSigninError("")
                }
              ></input>
              {Error2 && <p className="text-danger">{Error2}</p>}
            </div>
          </div>
          <div className="input-box-1">
            <div className="tag">
              <line>Last Name(Optional)</line>
            </div>
            <div>
              <input
                className="input-short"
                type="text"
                placeholder="Enter your last name"
                value={LName}
                onChange={(e) => setLName(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="input-box-0">
          <div className="tag">
            <line>Birthday</line>
          </div>
          <div>
            <input
              className="input-long"
              type="date"
              placeholder="select a date"
              value={Bdate}
              onChange={(e) =>
                setBdate(e.target.value) || setError3("") || setSigninError("")
              }
            ></input>
            {Error3 && <p className="text-danger">{Error3}</p>}
          </div>
        </div>
        <div className="input-box">
          <div className="input-box-1">
            <div className="tag">
              <line>Password</line>
            </div>
            <div>
              <input
                className="input-short"
                type="password"
                placeholder="Enter your password"
                value={Pw}
                onChange={(e) => setPw(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="input-box-1">
            <div className="tag">
              <line>Confirm Password</line>
            </div>
            <div>
              <input
                className="input-short"
                type="password"
                placeholder="confirm your password"
                value={C_Pw}
                onChange={(e) => setCPw(e.target.value) || setSigninError("")}
              ></input>
            </div>
          </div>
        </div>
        {SigninError && <p className="text-danger">{SigninError}</p>}
        <div>
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
