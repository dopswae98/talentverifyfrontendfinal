import { Route, Routes } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "./App.css";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { DataContextProvider } from "./Components/TheContext";
import PrivateRoute from "./Components/PrivateRoute";

// import LoginPage from "./Pages/LoginPage";
// import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Notfound from "./Pages/Notfound";
import BulkyEmployeesUpload from "./Pages/BulkyEmployeesUpload";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";
import AddCompany from "./Pages/AddCompany";
import BulkyCompaniesUpload from "./Pages/BulkyCompaniesUpload";
import LoadingEffect from "./Components/LoadingEffect";
import CompanyList from "./Pages/CompanyList";
import EmployeeList from "./Pages/EmployeeList";
import EditCompany from "./Pages/EditCompany";

function App() {
  return (
    <DataContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/home" element={<PrivateRoute />}> */}
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/home/companieslist" element={<CompanyList />} />
          <Route
            path="/home/companieslist/:companyid"
            element={<EditCompany />}
          />
          <Route path="/home/addcompany" element={<AddCompany />} />
          <Route
            path="/home/bulkycompaniesupload"
            element={<BulkyCompaniesUpload />}
          />
          <Route path="/home/employeeslist" element={<EmployeeList />} />
          <Route
            path="/home/employeeslist/:employeeid"
            element={<EditEmployee />}
          />
          <Route path="/home/addemployee" element={<AddEmployee />} />
          <Route
            path="/home/bulkyemployeesupload"
            element={<BulkyEmployeesUpload />}
          />
        </Route>
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </DataContextProvider>
  );
}

export default App;
library.add(fab, fas, far);
