import React, { useEffect, useState } from "react";
import axios from "axios";
import Card_0 from "./Card_0";
import { useParams } from "react-router-dom";
import CheckBox from "./Component/CheckBox";
import Navbar from "./Component/Navbar";
import "./Categorie.css";

const Categorie = () => {
  //console.log(params);

  const { Categorie_ID } = useParams();
  // console.log(Categorie_ID);

  const [Categorie, setCategorie] = useState([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/categorie/Listings/${Categorie_ID}`
        );
        setCategorie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategorie();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="Listing">
        <div className="Check-box">
          <CheckBox />
        </div>
        <div className="cat-card-0">
          {Categorie.map((Agent) => (
            <tr key={Agent.Listing_ID}>
              <Card_0 Name={Agent.Name} id={Agent.Listing_ID} />
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorie;
