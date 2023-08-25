import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  // Define the values you want to provide to consuming components
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoutAll, setLogoutAll] = useState(false);
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [auth, setAuth] = useState({ token: false });
  const [token, setToken] = useState(false);
  const [table_loader, setTable_loader] = useState(true);

  const [formData, setFormData] = useState({
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

  const companiesApi = () =>
    axios
      .get(`https://talentbackend.onrender.com/companies/`)
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

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

  const [fakeAuthService, setFakeAuthService] = useState({
    isAuthenticated: localStorage.getItem("token"),
    login(callback) {
      this.isAuthenticated = true;
      setTimeout(callback, 100);
    },
    logout(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  });

  const login = (token) => {
    localStorage.setItem("token", true);
    setIsAuthenticated(true);
    navigate("/home"); // Redirect to private route after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login page after logout
  };

  const contextValue = {
    setFormData,
    formData,
    handleChange,
    companies,
    setCompanies,
    companyDetails,
    setCompanyDetails,
    api,
    auth,
    setAuth,
    login,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    fakeAuthService,
    setFakeAuthService,
    employeeDetails,
    setEmployeeDetails,
    companiesApi,
    table_loader,
    logoutAll,
    setLogoutAll,
    token,
    setToken,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// export default TheContext;
export { DataContext, DataContextProvider };
