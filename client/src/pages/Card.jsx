import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Transeport from "../assets/Images/Trancport.png";

function Card({ Name, id }) {
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/categorie/catImage/${id}`,
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([res.data], {
          type: res.headers["Content-Type"],
        });
        const url = URL.createObjectURL(blob);
        setImg(url);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage();
  }, [id]);

  return (
    <div>
      <Link to={`/categorie/Listings/${id}`}>
        <div className="card">
          <img className="cat-img" src={img} alt="Categorie" />
          <h2>{Name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Card;
