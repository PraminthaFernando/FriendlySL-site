import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Card_0({ Name, id }) {
  return (
    <div>
      <Link to={`${id}`}>
        <div className="card">
          <img alt="cat picture"></img>
          <h2>{Name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Card_0;
