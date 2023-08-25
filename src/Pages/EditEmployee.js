import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../Components/TableComponent";
import { DataContext } from "../Components/TheContext";
import axios from "axios";
import NavbarComponent from "../Components/NavbarComponent";

const EditEmployee = () => {
  const { message, companies, setCompanies, companyDetails } =
    useContext(DataContext);
  const [loader, setLoader] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({ ...companyDetails });
  //   const formData = companyDetails;
  const { employeeid } = useParams();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(employeeid);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    console.log(formData);
    axios
      // .post("http://localhost:4000/send-email", formData)
      .put(
        "https://talentbackend.onrender.com/employees/" + employeeid + "/",
        formData
      )
      .then((response) => {
        console.log(response);
        console.log("formdata", formData);
        setLoader(false);
        setFeedback(true);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setFeedback(false);
      });
    const api = () =>
      axios
        .get(`https://talentbackend.onrender.com/employees/`)
        .then((response) => {
          setCompanies(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };
  console.log(formData);
  return (
    <div
      className="text-center pb-5 position-relative"
      style={{ overflowX: "hidden" }}
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
      <NavbarComponent />
      <div
        className={
          feedback === true
            ? "alert alert-success alert-dismissible fade show container mt-5 visible"
            : feedback === false
            ? "alert alert-danger alert-dismissible fade show container mt-5 text-center visible"
            : "invisible alert alert-success alert-dismissible fade show container mt-5"
        }
        role="alert"
      >
        <span className="fw-bold ms-1">
          {feedback ? "Update Successfully" : `An Error Occurred`}
        </span>
        <button
          type="button"
          className="btn-close d-none"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <h1 className="mt-5 fw-bold text-success">Edit Employee Details</h1>
      <p>{message}</p>
      <p>{formData.name}</p>
      {/* <TableComponent /> */}
      <div className="edit-section">
        <div className="form py-5">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <form action="" method="POST" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Company Name
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
                  <label htmlFor="dateRegistered" className="form-label">
                    Employee ID Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dateRegistered"
                    name="employee_id_number"
                    value={formData.employee_id_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="companyRegistrationNumber"
                    className="form-label"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyRegistrationNumber"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactPerson" className="form-label">
                    Date Started
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="contactPerson"
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
                  className="btn btn-success w-100 rounded-0 fw-bold fs-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
