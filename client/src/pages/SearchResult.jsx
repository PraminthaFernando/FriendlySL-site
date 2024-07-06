import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./Component/searchBar";
import Card from "./Card";

const SearchResult = () => {
  const { categorie_ID } = useParams();
  console.log(categorie_ID);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/categorie/${categorie_ID}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllResult();
  });

  return (
    <div>
      <div className="search-card">
        <SearchBar />
      </div>
      <div className="cat-card">
        <tr key={data.Category_ID}>
          <Card Name={data.Name} id={data.Category_ID} />
        </tr>
      </div>
    </div>
  );
};

export default SearchResult;
