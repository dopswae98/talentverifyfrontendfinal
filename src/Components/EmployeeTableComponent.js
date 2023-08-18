import React from "react";
import { Link } from "react-router-dom";

const EmployeeTableComponent = ({
  loading,
  searchedProducts,
  EditCompany,
  deleteCompany,
}) => {
  return (
    <div>
      <table className="table text-center rounded">
        {loading ? (
          <div className="d-flex align-item-center justify-content-center">
            <div
              class="spinner-grow bg-warning text-center"
              role="status"
              style={{ height: "6rem", width: "6rem" }}
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Department</th>
                <th scope="col">Role</th>
                <th scope="col">Date Started</th>
                <th scope="col">Date Left</th>
                <th scope="col">Duties</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>

            <tbody>
              {searchedProducts.map((company, id) => {
                return (
                  <tr key={id} className="text-center bg-danger">
                    <th scope="row">{id + 1}</th>
                    <td className="text-danger">{company.name}</td>
                    <td>{company.employee_id_number}</td>
                    <td>{company.department}</td>
                    <td>{company.role}</td>
                    <td>{company.date_started}</td>
                    <td>{company.date_left}</td>
                    <td>{company.duties}</td>

                    <td>
                      <Link
                        className=""
                        to={`/home/employeeslist/${company.id}`}
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
          </>
        )}
      </table>
    </div>
  );
};

export default EmployeeTableComponent;
