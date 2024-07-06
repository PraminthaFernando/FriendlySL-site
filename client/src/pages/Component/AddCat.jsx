import axios from "axios";
import React, { useState } from "react";
import "./AddCat.css";
import { useNavigate } from "react-router-dom";

const AddCat = () => {
  // const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [File, setFile] = useState();
  const [state, setState] = useState(false);
  const [image, setImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [newimage, setNewimage] = useState({
    Title: "",
    Path: "",
  });

  const navigate = useNavigate();

  const handleDragover = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e);
  };

  const handleFile = async (e) => {
    // console.log(e.files[0]);
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
        // console.log(res.data);
        setNewimage((prev) => ({
          ...prev,
          ["Path"]: res.data.path,
        }));
        setImage(URL.createObjectURL(e.files[0]));
        setError("");
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        setError("Error uploading file");
      });
    setState(true);
  };

  const handleClick = (e) => {
    setImage(null);
    setProgressBar(0);
    setState(false);
  };

  const handleBack = (e) => {
    navigate("/AdminDashboard");
  };

  const handleConfirm = async (e) => {
    // console.log(newimage.Path);
    setImage(null);
    setProgressBar(0);
    setState(false);

    if (!newimage.Path) {
      setError("Add a image file");
      return;
    }

    if (!newimage.Title) {
      setError("Please enter a title");
      return;
    }

    if (isImageFile(File)) {
      alert("Upload entered categorie?");
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
        const res = await axios
          .post(`http://localhost:8800/Image/Upload`, newimage)
          .then(alert("Successfuly uploaded"));
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
        <h1>Add Category</h1>
        <div className="input-box-0">
          <div className="tag">
            <a>Category Name:</a>
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
        <div className="drop-box">
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
        {state ? (
          <button className="btn" onClick={handleClick}>
            Change
          </button>
        ) : null}
        <div className="btn-box">
          <button className="Add" onClick={(e) => handleConfirm(e)}>
            Add
          </button>
          <button className="Add" onClick={handleBack}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCat;
