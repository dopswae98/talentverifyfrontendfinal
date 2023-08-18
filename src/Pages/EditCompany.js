import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../Components/TableComponent";
import { DataContext } from "../Components/TheContext";
import axios from "axios";
import EditCompanyFormComponent from "../Components/EditCompanyFormComponent";

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
              <EditCompanyFormComponent
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
