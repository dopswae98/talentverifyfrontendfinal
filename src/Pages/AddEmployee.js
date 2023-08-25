import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import FooterComponent from "../Components/FooterComponent";

const AddEmployee = () => {
  const [companies, setCompanies] = useState([]);
  const [addedFeedback, setAddedFeedback] = useState(null);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    employee_id_number: "",
    department: "",
    role: "",
    date_started: "",
    date_left: "",
    duties: "",
  });

  const [clearFormData, setClearFormData] = useState({
    name: "",
    employee_id_number: "",
    department: "",
    role: "",
    date_started: "",
    date_left: "",
    duties: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    axios

      .post("https://talentbackend.onrender.com/employees/", formData)
      .then((response) => {
        setAddedFeedback(true);
        setFormData(clearFormData);
        setLoader(false);
      })
      .catch((error) => {
        setAddedFeedback(false);
        setLoader(false);
      });
    api();
  };

  const api = () =>
    axios
      .get(`https://talentbackend.onrender.com/employees/`)
      .then((response) => {
        setCompanies(response.data);
        setAddedFeedback(true);
      })
      .catch((error) => {
        console.error(error);
        setAddedFeedback(false);
      });

  useEffect(() => {
    api();
  }, []);

  return (
    <div className="position-relative bg-light overflow-hidden ">
      {loader && (
        <div className="loader position-absolute h-100 top-0 right-0 left-0 bottom-0 d-flex justify-content-center add_modal w-100 align-items-center">
          <div
            className="spinner-border bg-success text-warning fw-bold h1 fs-1s"
            role="status"
            style={{ fontSize: 30, height: 110, width: 110 }}
          ></div>
        </div>
      )}
      <NavbarComponent />
      <h1 className="fw-bold text-center text-success pt-4">Add Employee</h1>
      {/* <SearchComponent companies={companies} setCompanies={setCompanies} /> */}

      <div className="form py-5 mb-5" style={{ fontSize: 12 }}>
        <div
          className={
            addedFeedback === true
              ? "alert alert-success alert-dismissible fade show container mb-5"
              : addedFeedback === false
              ? "alert alert-danger alert-dismissible fade show container mb-5"
              : "d-none"
          }
          role="alert"
        >
          {/* Record Added */}
          <span className="fw-bold ms-1">
            {addedFeedback === true
              ? "Record Added Successfully"
              : "An Error Occurred while Adding"}
          </span>
          <button
            type="button"
            className="btn-close d-none"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div className="row">
          <div className="col-md-7 mx-auto">
            <form action="" method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Employee Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="employee_id_number" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_id_number"
                  name="employee_id_number"
                  value={formData.employee_id_number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date_started" className="form-label">
                  Date Started
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_started"
                  name="date_started"
                  value={formData.date_started}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date_left" className="form-label">
                  Date Left
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_left"
                  name="date_left"
                  value={formData.date_left}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="duties" className="form-label">
                  Duties
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="duties"
                  name="duties"
                  value={formData.duties}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success rounded-pill fw-bold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default AddEmployee;
