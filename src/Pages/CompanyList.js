import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import SearchComponent from "../Components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterComponent from "../Components/FooterComponent";
import CompanyListTable from "../Components/CompanyListTable";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const {
    message,
    formData,
    setFormData,
    setCompanyDetails,
    loading,
    setLoading,
  } = useContext(DataContext);
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
      item.date_of_registration.toLowerCase().includes(query.toLowerCase()) ||
      item.address.toLowerCase().includes(query.toLowerCase()) ||
      item.date_of_registration.toLowerCase().includes(query.toLowerCase()) ||
      item.contact_person.toLowerCase().includes(query.toLowerCase()) ||
      item.departments.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.contact_phone.includes(query)
  );

  useEffect(() => {
    api();
    // handleSearch();
  }, []);

  return (
    <div
      className="bg-light overflow-hidden position-relative  container-xxl"
      style={{ minHeight: "100vh" }}
    >
      <section className="nav-section bg-warning">
        <NavbarComponent />
      </section>

      <section className="search-section pt-4">
        <div className="">
          <div className="row mx-1 mx-md-0">
            <div className="col-md-7 mx-auto px-0 bg-white rounded-pill">
              <form
                className="d-flex justify-content-between align-items-center rounded-pill border border-0 border-2 border-top-0 border-start-0 border-end-0 mx-0 box_shadow1"
                role="search"
              >
                <div className="left_search d-flex w-100 justify-content-center flex-grow align-items-center ">
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
        className="table py-5 rounded overflow-md-hidden overflow-auto"
        style={{ fontSize: 11 }}
      >
        <CompanyListTable
          loading={loading}
          searchedProducts={searchedProducts}
          EditCompany={EditCompany}
          deleteCompany={deleteCompany}
        />
      </section>
      <section className="footer-section">
        <FooterComponent />
      </section>
    </div>
  );
};

export default CompanyList;
