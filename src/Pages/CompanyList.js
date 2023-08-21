import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import SearchComponent from "../Components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterComponent from "../Components/FooterComponent";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { message, formData, setFormData, setCompanyDetails } =
    useContext(DataContext);
  const [query, setQuery] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(null);
  const [table_loader, setTable_loader] = useState(true);

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
        setTable_loader(false);
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

  const searchedProducts = companies.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.date_of_registration.toLowerCase().includes(query.toLowerCase()) ||
      item.address.toLowerCase().includes(query.toLowerCase()) ||
      item.date_of_registration.toLowerCase().includes(query.toLowerCase()) ||
      item.contact_person.toLowerCase().includes(query.toLowerCase()) ||
      item.departments.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.contact_phone.includes(query)
  );
  // date_of_registration: "",
  //   company_registration_number: "",
  //   address: "",
  //   contact_person: "",
  //   departments: "",
  //   num_employees: "",
  //   employees: "",
  //   contact_phone: "",
  //   email:
  // setCompanies(searchedProducts);
  // console.log(searchedProducts);

  useEffect(() => {
    api();
    // handleSearch();
  }, []);

  return (
    <div
      className="relative bg-light overflow-hidden position-relative"
      style={{ minHeight: "100vh" }}
    >
      {table_loader && (
        <div className="loader position-absolute top-0 right-0 left-0 bottom-0 d-flex justify-content-center add_modal w-100 align-items-center">
          <div
            className="spinner-border bg-success text-warning fw-bold h1 fs-1s"
            role="status"
            style={{ fontSize: 30, height: 110, width: 110 }}
          ></div>
        </div>
      )}
      <section className="nav-section bg-warning">
        <NavbarComponent />
      </section>
      {/* <h1>Company List</h1> */}
      {/* <SearchComponent companies={companies} setCompanies={setCompanies} /> */}
      <section className="search-section pt-4">
        <div className="">
          <div className="row mx-1 mx-md-0">
            <div className="col-md-7 mx-auto px-0 bg-white rounded-pill">
              <form
                className="d-flex justify-content-between align-items-center rounded-pill border border-0 border-2 border-top-0 border-start-0 border-end-0 mx-0 box_shadow1"
                role="search"
              >
                <div className="left_search d-flex w-100 justify-content-center flex-grow align-items-center ">
                  {/* <FontAwesomeIcon
                className="ms-2"
                icon="fa-search"
                color="black"
                width={25}
                height={25}
              /> */}
                  <input
                    className="search-input form-control me-2 bg-transparent border-0 outline-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                </div>
                <div>
                  <button
                    className="search btn btn-outline-danger d-flex align-items-center justify-content-center"
                    onClick={(e) => e.preventDefault()}
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon="fa-search"
                      color="black"
                      // onClick={handleCart}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section
        className="table py-5 rounded overflow-md-hidden overflow-auto container-xxl"
        style={{ fontSize: 11 }}
      >
        <table className="table text-center rounded">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Date Registered</th>
              <th scope="col">Company Registration Number</th>
              <th scope="col">Address</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Contact Phone</th>
              <th scope="col">List Of departments</th>
              <th scope="col">Number of Employees</th>
              <th scope="col">Email Address</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchedProducts.map((company, id) => {
              return (
                <tr key={id} className="text-center bg-danger">
                  <th scope="row">{id + 1}</th>
                  <td className="text-danger">{company.name}</td>
                  <td>{company.date_of_registration}</td>
                  <td>{company.company_registration_number}</td>
                  <td>{company.address}</td>
                  <td>{company.contact_person}</td>
                  <td>{company.contact_phone}</td>
                  <td>{company.departments}</td>
                  <td>{company.num_employees}</td>
                  <td>{company.email}</td>
                  <td>
                    <Link
                      className=""
                      to={`/home/companieslist/${company.id}`}
                      onClick={() => EditCompany(company)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Edit
                    </Link>
                    <button
                      className=" text-white bg-danger ms-1 rounded p-1"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="footer-section">
        <FooterComponent />
      </section>
    </div>
  );
};

export default CompanyList;
