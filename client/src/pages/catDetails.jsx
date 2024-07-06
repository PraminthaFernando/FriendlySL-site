import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CatDetails = () => {
  //console.log(params);

  const { Categorie_ID } = useParams();
  const { Listing_ID } = useParams();
  console.log(Categorie_ID);

  const [Details, setDetails] = useState([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/categorie/${Categorie_ID}/${Listing_ID}`
        );
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategorie();
  }, []);

  return (
    <div className="det-card">
      <img alt="Agent Pic"></img>
      <h1>{Details.Name}</h1>
      <h3>Location:{Details.Place}</h3>
      <p>{Details.Description}</p>
    </div>
  );
};

export default CatDetails;
