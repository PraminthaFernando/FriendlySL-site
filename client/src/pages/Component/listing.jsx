import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const listing = () => {
  const user = sessionStorage.getItem("User_ID");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState();
  const [description, setDescription] = useState("");
  const [Error1, setError1] = useState("");
  const [Error2, setError2] = useState("");
  const [Error3, setError3] = useState("");
  const [Error4, setError4] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();
  const level = sessionStorage.getItem("level");

  function handleConfirm() {
    if (location === "" || contact === null || title === "" || cat === "") {
      setError("Registration Error");
      if (title === "") {
        setError1("fill this field");
      }
      if (cat === "") {
        setError2("fill this field");
      }
      if (location === "") {
        setError3("fill this field");
      }
      if (contact === null) {
        setError4("fill this field");
      }
    } else {
      try {
        if (level == 3) {
          navigate("/AgentDashboard");
        } else {
          navigate("/AdminDashboard");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleKeyDown = (e, index) => {
    console.log(e.key);
    if (e.key === "Enter") {
      const form = e.target.form;
      const focusableElements = form.querySelectorAll(
        "input, button, textarea, select"
      );
      const nextElement =
        focusableElements[
          Array.prototype.indexOf.call(focusableElements, e.target) + 1
        ] || form.querySelector('button[type="confirm"]');
      nextElement.focus();
    }
  };

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
  });

  return (
    <div className="register-card">
      <form className="register-card-0">
        <h1>Listing Services</h1>
        <div className="input-box-0">
          <div className="tag">
            <line>Title</line>
          </div>
          <div>
            <input
              className="input-long"
              type="text"
              name="Title"
              placeholder="Enter a title"
              value={title}
              required
              onChange={(e) =>
                setTitle(e.target.value) || setError1("") || setError("")
              }
              onKeyDown={(e) => handleKeyDown(e, 0)}
              autoFocus
            ></input>
            {Error1 && <p className="text-danger">{Error1}</p>}
          </div>
        </div>
        <div className="select-box">
          <div className="tag">
            <line>categorie</line>
          </div>
          <select
            className="select"
            onChange={(e) =>
              setCat(e.target.value) || setError2("") || setError("")
            }
            onKeyDown={(e) => handleKeyDown(e, 1)}
            required
          >
            <option value="">Select an option</option>
            {categories.map((c) => (
              <option value={c.Name}>{c.Name}</option>
            ))}
          </select>
          {Error2 && <p className="text-danger">{Error2}</p>}
        </div>
        <div className="input-box">
          <div className="input-box-1">
            <div className="tag">
              <line>contact No:</line>
            </div>
            <div>
              <input
                className="input-short"
                type="number"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) =>
                  setContact(e.target.value) || setError3("") || setError("")
                }
                onKeyDown={(e) => handleKeyDown(e, 2)}
                required
              ></input>
              {Error3 && <p className="text-danger">{Error3}</p>}
            </div>
          </div>
          <div className="input-box-1">
            <div className="tag">
              <line>Location</line>
            </div>
            <div>
              <input
                className="input-short"
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value) || setError4("") || setError("")
                }
                onKeyDown={(e) => handleKeyDown(e, 3)}
                required
              ></input>
              {Error4 && <p className="text-danger">{Error4}</p>}
            </div>
          </div>
        </div>
        <div className="input-box-0">
          <div className="tag">
            <line>Description</line>
          </div>
          <div>
            <input
              className="input-long"
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            ></input>
          </div>
        </div>
        {Error && <p className="text-danger">{Error}</p>}
        <div>
          <button
            className="confirm-btn"
            type="confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default listing;
