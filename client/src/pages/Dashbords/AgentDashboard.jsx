import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card";
import SearchBar from "../Component/searchBar";
import Navbar from "../Component/Navbar";

function AgentDashboard() {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategorie = async () => {
      try {
        const res = await axios.get("http://localhost:8800/categorie");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorie();
  }, []);
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="search-card">
        <SearchBar />
      </div>
      <div className="cat-card">
        {Categories.map((Categorie) => {
          return (
            <tr key={Categorie.Category_ID}>
              <Card Name={Categorie.Name} id={Categorie.Category_ID} />
            </tr>
          );
        })}
      </div>
    </div>
  );
}

export default AgentDashboard;
