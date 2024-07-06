import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Place({ id }) {
  const [Place, setPlace] = useState();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/Place/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlace();
  });

  return <div>{Place.Place}</div>;
}

export default Place;
