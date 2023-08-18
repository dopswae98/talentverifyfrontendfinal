import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import SearchComponent from "../Components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterComponent from "../Components/FooterComponent";
import EmployeeTableComponent from "../Components/EmployeeTableComponent";

const EmployeeList = () => {
  const [companies, setCompanies] = useState([]);
  const {
    message,
    formData,
    setFormData,
    setCompanyDetails,
    loading,
    setLoading,
  } = useContext(DataContext);
  const [query, setQuery] = useState("a");
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
      .delete(`https://talentbackend.onrender.com/employees/${id}`, {
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
      .get(`https://talentbackend.onrender.com/employees`)
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
        setLoading(false);
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
      item.employee_id_number.toLowerCase().includes(query.toLowerCase()) ||
      item.department.toLowerCase().includes(query.toLowerCase()) ||
      item.role.toLowerCase().includes(query.toLowerCase()) ||
      item.date_started.toLowerCase().includes(query.toLowerCase()) ||
      item.date_left.toLowerCase().includes(query.toLowerCase()) ||
      // item.date_left.includes(query.toLowerCase()) ||
      item.duties.toLowerCase().includes(query.toLowerCase())
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
      className="bg-light overflow-hidden vw-100 vw-md-auto container-xxl"
      style={{ minHeight: "100vh" }}
    >
      <NavbarComponent />
      {/* <h1>Company List</h1> */}
      {/* <SearchComponent companies={companies} setCompanies={setCompanies} /> */}
      <section className="search-section pt-4">
        <div className="">
          <div className="row mx-1 mx-md-0">
            <div className="col-md-7 mx-auto px-0 bg-white rounded-pill">
              <form
                className="d-flex justify-content-between align-items-center border border-0 border-2 border-top-0 border-start-0 border-end-0 mx-0"
                role="search"
              >
                <div className="left_search d-flex w-100 justify-content-center flex-grow align-items-center">
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
                    onChange={(e) => {
                      setQuery(e.target.value);
                      console.log(query);
                    }}
                  />
                </div>
                <div>
                  <button
                    className="search btn btn-outline-danger"
                    // onClick={handleSearch}
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
        className="table py-5 rounded overflow-md-hidden overflow-auto"
        style={{ fontSize: 11 }}
      >
        <EmployeeTableComponent
          loading={loading}
          searchedProducts={searchedProducts}
          EditCompany={EditCompany}
          deleteCompany={deleteCompany}
        />
      </section>
      <FooterComponent />
      {/* {loading && (
        <div className="d-flex align-item-center justify-content-center">
          <div
            class="spinner-grow text-danger text-center"
            role="status"
            style={{ height: "6rem", width: "6rem" }}
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EmployeeList;
