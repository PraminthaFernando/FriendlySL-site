import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import NavBarLink from "./NavBarLink";
import logo from "./download.jpg";
import Accimg from "./leto-04-64.jpg";

function Navbar() {
  const [Name, setName] = useState("Primary User");
  const [F_Name, setFname] = useState("Primary User");
  const [Menu, setMenu] = useState([]);
  const links = ["Home", "categories", "services", "about"];
  const level = sessionStorage.getItem("level");
  const ID = sessionStorage.getItem("User_ID");

  useEffect(() => {
    const fetchName = async () => {
      try {
        if (level != 1) {
          const res = await axios.get(`http://localhost:8800/Users/${ID}`);
          setFname(res.data.First_Name);
          if (level == 2) {
            setMenu(["Signin"]);
          } else {
            setMenu(["Listing"]);
          }
        } else {
          setMenu(["login", "Signin"]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchName();
  }, []);

  return (
    <div className="Navigation">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="barMenu">
        {links.map((M) => {
          return <NavBarLink L_Name={M}></NavBarLink>;
        })}
      </div>
      <div className="barLinks">
        <p>
          {Menu.map((M) => {
            return <NavLink to={`/${M}`}>{M}</NavLink>;
          })}
        </p>
      </div>
      <div className="userAcc">
        <img src={Accimg}></img>
        <h4>{F_Name}</h4>
      </div>
    </div>
  );
}

export default Navbar;
