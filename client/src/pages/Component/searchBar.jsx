import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function SearchBar() {
  const [value, setValue] = useState();
  const [id, setID] = useState();
  const [data, setData] = useState([]);
  const onChange = async (e) => {
    setValue(e.target.value);
    const response = await fetch("http://localhost:8800/categorie");
    const data = await response.json();
    setData(data);
  };

  return (
    <div>
      <div className="Search">
        <input
          className="input-bar"
          placeholder="Type to search categorie"
          type="text"
          onChange={onChange}
          value={value}
        ></input>
        <button className="search-button">
          <NavLink to={`/categorie/${id}`}>search</NavLink>
        </button>
      </div>
      <div className="dropdown-content">
        {value &&
          data
            .filter(
              (item) => item.Name.startsWith(value) && item.Name !== value
            )
            .map((item) => {
              return (
                <div
                  className="content-card"
                  key={item.Category_ID}
                  onClick={(e) =>
                    setValue(item.Name) || setID(item.Category_ID)
                  }
                >
                  {item.Name}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SearchBar;
