import React, { useState } from "react";
import axios from "axios";
import NavbarComponent from "../Components/NavbarComponent";
import FooterComponent from "../Components/FooterComponent";

const BulkyCompaniesUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
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

      setFeedback(true);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setFeedback(false);
      setLoader(false);
    }
  };

  return (
    <div
      className="text-center lesscontent position-relative"
      style={{ minHeight: "100vh" }}
    >
      {loader && (
        <div className="loader position-absolute h-100 top-0 right-0 left-0 bottom-0 d-flex justify-content-center add_modal w-100 align-items-center">
          <div
            className="spinner-border bg-success text-warning fw-bold h1 fs-1s"
            role="status"
            style={{ fontSize: 30, height: 110, width: 110 }}
          ></div>
        </div>
      )}
      <section className="nav-section">
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
        <span className="fw-bold ms-1">File Uploaded Successfully</span>
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
      <section className="footer-section">
        <FooterComponent />
      </section>
    </div>
  );
};

export default BulkyCompaniesUpload;
