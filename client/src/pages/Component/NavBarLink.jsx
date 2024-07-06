import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./NavBarLink.css";

function NavBarLink({ L_Name }) {
  const handleLink = (name) => {
    const level = sessionStorage.getItem("level");

    if (name == "Home") {
      if (level == 2) {
        return "UserDashboard";
      } else if (level == 3) {
        return "AgentDashboard";
      } else if (level == 4) {
        return "AdminDashboard";
      } else {
        return name;
      }
    }
  };

  return (
    <div className="Menu">
      <NavLink to={`/${handleLink(L_Name)}`}>{L_Name}</NavLink>
    </div>
  );
}

export default NavBarLink;
