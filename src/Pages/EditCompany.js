import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../Components/TableComponent";
import { DataContext } from "../Components/TheContext";
import axios from "axios";

const EditCompany = () => {
  const { message, companies, setCompanies, companyDetails } =
    useContext(DataContext);
  const [formData, setFormData] = useState({ ...companyDetails });
  //   const formData = companyDetails;
  const { companyid } = useParams();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(companyid);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      // .post("http://localhost:4000/send-email", formData)
      .put(
        "https://talentbackend.onrender.com/companies/" + companyid + "/",
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
  return (
    <div className="text-center py-5" style={{ overflowX: "hidden" }}>
      <h1>Edit Company Details</h1>

      <p>Hello {formData.name}</p>
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
                    Date Registered
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateRegistered"
                    name="date_of_registration"
                    value={formData.date_of_registration}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="companyRegistrationNumber"
                    className="form-label"
                  >
                    Company Registration Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyRegistrationNumber"
                    name="company_registration_number"
                    value={formData.company_registration_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactPerson" className="form-label">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactPhone" className="form-label">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPhone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="listOfDepartments" className="form-label">
                    List Of departments
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="listOfDepartments"
                    name="departments"
                    value={formData.departments}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfEmployees" className="form-label">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfEmployees"
                    name="num_employees"
                    value={formData.num_employees}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
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

export default EditCompany;
