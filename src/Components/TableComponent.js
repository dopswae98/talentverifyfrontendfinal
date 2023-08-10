import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TableComponent = ({ EditCompany, deleteCompany, companies }) => {
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
  return (
    <div>
      <table className="table text-center rounded" style={{ fontSize: 11 }}>
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
          {companies.map((company, id) => {
            return (
              <tr key={id} className="text-center bg-danger">
                <th scope="row">{company.id}</th>
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
                    to={`/companyDetail/${company.id}`}
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
    </div>
  );
};

export default TableComponent;
