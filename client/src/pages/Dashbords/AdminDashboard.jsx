import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card";
import SearchBar from "../Component/searchBar";
import Navbar from "../Component/Navbar";
import AddCat from "../Component/AddCat";
import "./AgentDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
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
      <div className="content-box">
        <div className="fucn-list">
          <a href="/AddCat">New categrie</a>
          <a href="/Edit">Edit categorie</a>
        </div>
        <div className="content-box-2">
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
      </div>
    </div>
  );
}

export default AdminDashboard;
