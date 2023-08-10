import React, { useEffect, useState } from "react";
// import { DataContext } from "../Components/TheContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const SearchComponent = () => {
  const [companies, setCompanies] = useState("");
  useEffect(() => {
    const api = () =>
      axios
        .get(`http://127.0.0.1:8000/companies/`)
        .then((response) => {
          setCompanies(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

    return () => {
      api();
    };
  }, []);

  const [query, setQuery] = useState("");
  const [companiesData, setCompaniesData] = useState([]);
  //   const { companies, setCompanies } = useContext(DataContext);
  console.log("companies", companies);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const searchedProducts = companies.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setCompanies(searchedProducts);
  };
  //   if (query === "") {
  //     setCompanies(companies);
  //   }
  return (
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
                onChange={handleSearch}
              />
            </div>
            <div>
              <button
                className="search btn btn-outline-warning"
                onClick={handleSearch}
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
  );
};

export default SearchComponent;
