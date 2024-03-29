import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../Components/TheContext";
import NavbarComponent from "../Components/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterComponent from "../Components/FooterComponent";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EmployeeList = () => {
  const [companies, setCompanies] = useState([]);
  const { setCompanyDetails } = useContext(DataContext);
  const [query, setQuery] = useState("a");
  const [table_loader, setTable_loader] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(true);

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setIdToDelete(id);
  };

  const deleteCompany = () => {
    setTable_loader(true);
    setDeleteModal(false);
    axios
      .delete(`https://talentbackend.onrender.com/employees/${idToDelete}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTable_loader(false);
        api();
      })
      .catch((error) => {
        console.error(error);
        setTable_loader(false);
      });
  };
  const EditCompany = (company) => {
    setCompanyDetails(company);
  };

  const api = () =>
    axios
      .get(`https://talentbackend.onrender.com/employees`)
      .then((response) => {
        setCompanies(response.data);

        setTable_loader(false);
      })
      .catch((error) => {
        console.error(error);
      });

  const searchedProducts = companies.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.employee_id_number.toLowerCase().includes(query.toLowerCase()) ||
      item.department.toLowerCase().includes(query.toLowerCase()) ||
      item.role.toLowerCase().includes(query.toLowerCase()) ||
      item.date_started.includes(query.toLowerCase()) ||
      item.date_left.includes(query.toLowerCase()) ||
      item.duties.toLowerCase().includes(query.toLowerCase())
  );

  if (deleteModal) {
    document.documentElement.style.overflowY = "hidden";
  } else {
    document.documentElement.style.overflowY = "auto";
  }
  useEffect(() => {
    api();
  }, []);

  return (
    <div
      className="position-relative bg-lights overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <NavbarComponent />

      {deleteModal && (
        <div className="delete_modal box_shadow3 position-absolute vw-100 vh-100 top-0 containers right-0 left-0 bottom-0 d-flex justify-content-center add_modal align-items-center">
          <div className="row w-100 h-25s" style={{ height: 200 }}>
            <div className="col-md-6 mx-auto position-relative bg-white box_shadow3 rounded md:rounded-pill">
              <div
                className="position-absolute d-flex align-items-center justify-content-center top-3 end-0 me-2 md:me-5 text-white rounded-circle bg-danger right-0 fw-bold text-warning"
                style={{
                  width: 40,
                  height: 40,
                  top: 4,
                  cursor: "pointer",
                }}
                onClick={() => setDeleteModal(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className="d-flex flex-column align-items-center h-100 justify-content-center">
                <p className="fw-bold fs-3 ms-3 md:ms-0">
                  Are you sure you want to delete this record?
                </p>
                <div className="buttons d-flex gap-5">
                  <button
                    className="btn btn-outline-info rounded-pill px-5 fw-bold fs-5"
                    onClick={() => setDeleteModal(false)}
                  >
                    No
                  </button>
                  <button
                    className="btn btn-danger rounded-pill px-5 fw-bold fs-5"
                    onClick={() => deleteCompany()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {table_loader && (
        <div className="loader position-absolute top-0 right-0 left-0 bottom-0 d-flex justify-content-center add_modal h-100 w-100 align-items-center">
          <div
            className="spinner-border bg-success text-warning fw-bold h1 fs-1s"
            role="status"
            style={{ fontSize: 30, height: 110, width: 110 }}
          ></div>
        </div>
      )}
      <section className="search-section pt-4">
        <div className="">
          <div className="row mx-1 mx-md-0">
            <div className="col-md-7 mx-auto px-0 bg-white rounded-pill">
              <form
                className="box_shadow1 rounded-pill d-flex justify-content-between align-items-center border border-0 border-2 border-top-0 border-start-0 border-end-0 mx-0"
                role="search"
              >
                <div className="left_search d-flex w-100 justify-content-center flex-grow align-items-center">
                  <input
                    className="search-input form-control me-2 bg-transparent border-0 outline-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    className="search btn btn-outline-danger"
                    type="submit"
                  >
                    <FontAwesomeIcon icon="fa-search" color="black" />
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
        <table className="table text-center position-relative rounded">
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
                      className="fw-bold"
                      to={`/home/employeeslist/${company.id}`}
                      onClick={() => EditCompany(company)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Edit
                    </Link>
                    <button
                      className="delete_button fw-bold text-white bg-danger ms-2 rounded py-1 px-3"
                      onClick={() => handleDeleteModal(company.id)}
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
      <FooterComponent />
    </div>
  );
};

export default EmployeeList;
