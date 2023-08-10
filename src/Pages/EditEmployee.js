import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../Components/TableComponent";
import { DataContext } from "../Components/TheContext";
import axios from "axios";

const EditEmployee = () => {
  const { message, companies, setCompanies, companyDetails } =
    useContext(DataContext);
  const [formData, setFormData] = useState({ ...companyDetails });
  //   const formData = companyDetails;
  const { employeeid } = useParams();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(employeeid);
  const handleSubmit = (event) => {
    event.preventDefault();
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
      })
      .catch((error) => {
        console.log(error);
      });
    const api = () =>
      axios
        .get(`https://talentbackend.onrender.com/companies/`)
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
    <div className="text-center py-5" style={{ overflowX: "hidden" }}>
      <h1>Edit Company Details</h1>
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

                <button type="submit" className="btn btn-primary">
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
