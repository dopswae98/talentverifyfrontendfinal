import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import SearchComponent from "../Components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterComponent from "../Components/FooterComponent";

const AddEmployee = () => {
  const [companies, setCompanies] = useState([]);
  const { message, formData, setFormData, setCompanyDetails } =
    useContext(DataContext);
  const [query, setQuery] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(null);

  const [clearFormData, setClearFormData] = useState({
    name: "",
    date_of_registration: "",
    company_registration_number: "",
    address: "",
    contact_person: "",
    departments: "",
    num_employees: "",
    employees: "",
    contact_phone: "",
    email: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      // .post("http://localhost:4000/send-email", formData)
      .post("https://talentbackend.onrender.com/companies/", formData)
      .then((response) => {
        console.log(response);
        console.log("formdata", formData);
        setAddedFeedback(true);
        setFormData(clearFormData);
      })
      .catch((error) => {
        console.log(error);
        setAddedFeedback(false);
      });
    api();
  };

  const deleteCompany = (id) => {
    console.log(id);
    axios
      .delete(`https://talentbackend.onrender.com/companies/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // setCompanies(response.data);
        console.log("response", response);
        api();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const EditCompany = (company) => {
    setCompanyDetails(company);
    console.log("compantDetails", company);
  };

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

  // const handleSearch = (e) => {
  //   setQuery(e.target.value);
  //   console.log(query);
  //   const searchedProducts = companies.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setCompanies(searchedProducts);
  //   console.log(searchedProducts);
  // };
  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  const searchedProducts = companies.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  // setCompanies(searchedProducts);
  // console.log(searchedProducts);

  useEffect(() => {
    api();
    // handleSearch();
  }, []);

  return (
    <div className="bg-light overflow-hidden container-xxl">
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
            Successfully
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
                <label htmlFor="employees" className="form-label">
                  Employees
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="employees"
                  name="employees"
                  value={formData.employees}
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
