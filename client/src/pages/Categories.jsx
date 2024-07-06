import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import SearchBar from "./Component/searchBar";
import Navbar from "./Component/Navbar";

const Categories = () => {
  const [Categories, setCategories] = useState([]);
  sessionStorage.setItem("User_ID", 1);
  sessionStorage.setItem("level", 1);

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
        <Navbar />
      </div>
      <div className="content">
        <div className="search-card">
          <SearchBar />
        </div>
        <div className="cat-card">
          {Categories.map((Categorie) => {
            const img = Categorie.Img_ID;
            return <Card Name={Categorie.Name} id={Categorie.Category_ID} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
