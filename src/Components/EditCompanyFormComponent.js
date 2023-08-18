import React from "react";

const EditCompanyFormComponent = (handleChange, handleSubmit, formData) => {
  return (
    <div>
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
          <label htmlFor="companyRegistrationNumber" className="form-label">
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCompanyFormComponent;
