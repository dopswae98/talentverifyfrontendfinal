import React, { useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingBag, faSearch } from "@fortawesome/free-solid-svg-icons";
// import logo from "../img/wholelitelogo7.png";
// import { useUserAuth } from "./UserAuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "./TheContext";
// import products from "../assets/data/products";
import logo from "../Images/talentlogo.png";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { fakeAuthService, setFakeAuthService } = useContext(DataContext);
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    fakeAuthService.login(() => {
      setIsLoading(false);
      // setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
      console.log(fakeAuthService);
      navigate("/dashboard");
    });
  }

  const handleLogout = () => {
    // navigate("/login");
    // return <Navigate to="/login" replace={true} />;
    fakeAuthService["isAuthenticated"] = false;
    setFakeAuthService({ ...fakeAuthService, isAuthenticated: false });

    setAuth(true);
    // const fakeAuthService = {
    //   isAuthenticated: false,
    //   login(callback) {
    //     this.isAuthenticated = true;
    //     setTimeout(callback, 100);
    // //   },
    //   logout(callback) {
    //     this.isAuthenticated = true;
    //     setTimeout(callback, 100);
    //   },
    // };
    // history.pushState("/login");
    console.log("logged out");
    // navigate("../login", { replace: true });
    if (
      // !fakeAuthService.isAuthenticated &&
      !auth
    ) {
      return <Navigate to="/login" replace={true} />;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="logo navbar-brand" to="/home">
            {/* <a className="logo navbar-brand" href="/#"> */}
            {/* <img src={logo} alt="Wholight Trading Logo" /> */}
            {/* </a> */}
            <span className="">
              <img src={logo} alt="logo" height={47} width={47} />
            </span>
            <span className="fw-bold">
              Talent <span className="text-success">Verify</span>{" "}
            </span>
          </Link>
          <div className="acc-cart-center position-relative ms-3">
            {/* <span className="badge bg-secondary rounded-circle">
              {cart.length}
            </span> */}
            <i className="fa-regular "></i>
            {/* <FontAwesomeIcon icon={faShoppingBag} onClick={handleCart} /> */}
            {/* <span className="ms-2 fw-bold">
              Talent <span className="text-danger">Verify</span>{" "}
            </span> */}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="me-auto"></div>
            <div className="ge ms-auto">
              <ul className="navbar-nav mb-2 mb-lg-0 fw-bold ">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home/addcompany"
                  >
                    Add Company
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home/addemployee"
                  >
                    Add Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home/employeeslist"
                  >
                    Employee List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home/companieslist"
                  >
                    Companies List
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="/#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Bulky Upload
                  </a>

                  <ul className="dropdown-menu fw-normal overflow-hidden">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/home/bulkycompaniesupload"
                      >
                        Bulky Companies Upload
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active "
                        aria-current="page"
                        to="/home/bulkyemployeesupload"
                      >
                        Bulky Employees Upload
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <button
                    type="submit"
                    className="btn btn-danger rounded-pill fw-bold ms-md-4 ms-0"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="acc-cart position-relative ms-3">
              {/* <span className="badge bg-secondary rounded-circle">
                {cart.length}
              </span> */}
              <i className="fa-regular "></i>
              {/* <FontAwesomeIcon icon={faShoppingBag} onClick={handleCart} /> */}
              <span className="ms-1"></span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
