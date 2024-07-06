import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddCat.css";
import "./Edit.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [Error2, setError2] = useState("");
  const [cat, setCat] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(true);
  const navigate = useNavigate();
  const [newimage, setNewimage] = useState({
    Title: "",
    Path: "",
  });

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

  const handleDragover = (e) => {
    e.preventDefault();
  };

  const handleClick = (e) => {
    if (state1 === false) {
      setState1(true);
    } else {
      setState1(false);
      setState2(true);
    }
  };

  const Back1 = (e) => {
    navigate("/AdminDashboard");
  };

  const handleFile = async (e) => {
    console.log(e.files[0]);
    setFile(e.files[0]);

    const formData = new FormData();
    formData.append("image", e.files[0]);

    const config = {
      headers: {
        "Content-Type": e.files[0].type,
      },
      onUploadProgress: (event) => {
        if (event.total) {
          setProgressBar(Math.round((event.loaded / event.total) * 100));
        }
      },
    };

    await axios
      .post("http://localhost:8800/Image", formData, config)
      .then((res) => {
        setPath(res);
        setNewimage((prev) => ({ ...prev, ["Path"]: res }));
        setImage(URL.createObjectURL(e.files[0]));
        setError("");
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        setError("Error uploading file");
      });
  };

  const handleConfirm = async (e) => {
    // console.log(newimage);
    if (!newimage.Path && !newimage.Title) {
      alert("Nothing will change");
      navigate("/AdminDashboard");
      return;
    }

    if (!newimage.Path) {
      alert("Image will not change");
      navigate("/AdminDashboard");
      return;
    }

    if (!newimage.Title) {
      alert("Title will not change");
      navigate("/AdminDashboard");
      return;
    }

    if (isImageFile(File)) {
      const config = {
        headers: {
          "Content-Type": File.type,
        },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgressBar(Math.round((event.loaded / event.total) * 100));
          }
        },
      };

      try {
        const res = await axios.post(
          `http://localhost:8800/Image/Update`,
          newimage
        );
        console.log(res.data);
        // Handle the response from the server
      } catch (err) {
        console.error("Error uploading image:", err);
        // Handle the error
      }
    } else {
      setImage(null);
      setProgressBar(0);
      setError("Enter a valid image file");
    }
  };

  const isImageFile = (file) => {
    // Define a list of valid image file types
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
    ];

    // Check if the file's MIME type is in the list of valid image file types
    return validImageTypes.includes(file.type);
  };

  return (
    <div className="register-card">
      <div className="register-card-0">
        <h1>Edit Categorie</h1>
        <div className="select-box">
          <div className="tag">
            <line>categorie: </line>
            <a>{cat}</a>
          </div>
          {state3 && (
            <select
              className="select"
              onChange={(e) =>
                setCat(e.target.value) ||
                setError2("") ||
                setError("") ||
                setState3(false)
              }
            >
              <option value={null}>Select a categorie</option>
              {categories.map((c) => (
                <option value={c.Name}>
                  {c.Category_ID}.{c.Name}
                </option>
              ))}
            </select>
          )}
          {Error2 && <p className="text-danger">{Error2}</p>}
        </div>
        {(state1 && (
          <div className="input-box-0">
            <div className="tag">
              <a>Edit category Name: (if not click next)</a>
            </div>
            <div>
              <input
                className="input-long"
                type="text"
                placeholder="Enter a Name"
                required
                onChange={(e) =>
                  setNewimage((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  })) || setError("")
                }
                name="Title"
              />
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        )) ||
          (state2 && (
            <div className="drop-box">
              <a>Edit image: (if not click next)</a>
              {image ? (
                <img src={image} alt="Uploaded" />
              ) : (
                <div
                  className="dropzone"
                  onDragOver={handleDragover}
                  onDrop={(e) => handleFile(e.dataTransfer) || setError("")}
                >
                  <h2>Drag and drop the image file</h2>
                  <h3>Or</h3>
                  <input
                    type="file"
                    onChange={(e) => handleFile(e.target) || setError("")}
                    name="Path"
                  />
                  {error && <p className="text-danger">{error}</p>}
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="progressbar"
                      aria-valuenow={progressBar}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${progressBar}%` }}
                    >
                      {progressBar}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        {msg && <p className="text-danger">{msg}</p>}
        <div className="btn-box">
          <button className="btn" onClick={Back1}>
            Cancel
          </button>
          {state2 ? (
            <button className="btn" onClick={handleConfirm}>
              Update
            </button>
          ) : (
            <button className="btn" onClick={handleClick}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
