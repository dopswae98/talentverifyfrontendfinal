import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "../Components/NavbarComponent";
import { DataContext } from "../Components/TheContext";

const CSVUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const { auth, setAuth } = useContext(DataContext);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    // event.PreventDefault()
    const formData = new FormData();
    formData.append("csv_file", selectedFile);

    try {
      await axios.post(
        "https://talentbackend.onrender.com/api/upload-csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("CSV file uploaded successfully");
      setFeedback(true);
    } catch (error) {
      console.error(error);
      setFeedback(false);
    }
  };
  useEffect(() => {
    // const auth = { token: false };
    setAuth({ token: true });
    const resetAuth = () => {
      //   setAuth({ token: false });
    };
    // return () => {
    resetAuth();
    console.log("auth", auth.token);
    // };
  }, []);

  return (
    <div className="text-center">
      <section className="nav-section text-start mb-5">
        <NavbarComponent />
      </section>
      <div
        className={
          feedback === true
            ? "alert alert-success alert-dismissible fade show container mb-5"
            : feedback === false
            ? "alert alert-danger alert-dismissible fade show container mb-5"
            : "d-none"
        }
        role="alert"
      >
        File Uploaded
        <span className="fw-bold ms-1">Successfully</span>
        <button
          type="button"
          className="btn-close d-none"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div className="mt-5">
        <h1 className="fw-bold mb-5">Select The CSV/EXCELL file to upload</h1>
        <input
          type="file"
          onChange={handleFileUpload}
          className="custom-file-input"
          id="customFile"
          name="csv"
          required
          accept=".csv"
        />
        <button
          className="btn btn-danger"
          onClick={(event) => handleSubmit(event)}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CSVUploader;
