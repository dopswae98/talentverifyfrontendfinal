import React, { useContext, useState, useEffect } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Components/TheContext";

const LoginPage = () => {
  const { fakeAuthService, setFakeAuthService } = useContext(DataContext);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [clearFormData, setClearFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  // const fakeAuthService = {
  //   isAuthenticated: false,
  //   login(callback) {
  //     this.isAuthenticated = true;
  //     setTimeout(callback, 100);
  //   },
  //   logout(callback) {
  //     this.isAuthenticated = false;
  //     setTimeout(callback, 100);
  //   },
  // };

  // handle Login for transferring purposes
  // function handleLogin() {
  //   setIsLoading(true);
  //   fakeAuthService.login(() => {
  //     setIsLoading(false);
  //     setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
  //     console.log(fakeAuthService);
  //     navigate("/dashboard");
  //   });
  // }

  // the working code for authentication from an api *****

  useEffect(() => {
    setFakeAuthService({ ...fakeAuthService, isAuthenticated: false });
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      // .post("http://localhost:4000/send-email", formData)
      // .post("http://127.0.0.1:8000/api/login/", formData)
      .post("https://talentbackend.onrender.com/api/login/", formData)
      .then((response) => {
        console.log(response);
        console.log("formdata", formData);
        setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
        // setAddedFeedback(true);
        // login();
        // setAuth({ token: true });
        setFeedback(true);
        navigate("/home");
        // <Navigate to="/upload-csv" />;

        console.log("login success");
        // setFormData(clearFormData);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
        setFeedback(false);
        // setAddedFeedback(false);
      });
    // api();
  };
  // the working code for authentication from an api *****
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  //   axios
  //     // .post("http://localhost:4000/send-email", formData)
  //     .post("http://127.0.0.1:8000/api/login/", formData)
  //     .then((response) => {
  //       console.log(response);
  //       console.log("formdata", formData);
  //       // setAddedFeedback(true);
  //       login();
  //       setAuth({ token: true });
  //       navigate("/upload-csv");
  //       // <Navigate to="/upload-csv" />;
  //       console.log("login success");
  //       // setFormData(clearFormData);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       // setAddedFeedback(false);
  //     });
  //   // api();
  // };

  // testing authentication code
  // function handleSubmit(e) {
  //   e.PreventDefault();
  //   setIsLoading(true);
  //   fakeAuthService.login(() => {
  //     setIsLoading(false);
  //     // setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
  //     console.log(fakeAuthService);
  //     console.log("to dash");
  //     navigate("/dashboard");
  //   });
  // }

  // working handle login call back function
  // function handleLogin() {
  //   setIsLoading(true);
  //   fakeAuthService.login(() => {
  //     setIsLoading(false);
  //     setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
  //     console.log(fakeAuthService);
  //     navigate("/dashboard");
  //   });
  // }

  return (
    <div className="bg-light overflow-hidden vh-100">
      <NavbarComponent />
      <div
        className={
          feedback === true
            ? "alert alert-success alert-dismissible fade show container mt-5 visible"
            : feedback === false
            ? "alert alert-danger alert-dismissible fade show container mt-5 text-center visible"
            : "invisible alert alert-success alert-dismissible fade show container mt-5"
        }
        role="alert"
      >
        <span className="fw-bold ms-1">
          {feedback ? "Login Success" : `Password Error`}
        </span>
        <button
          type="button"
          className="btn-close d-none"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <h1>Enter your Login Details</h1>
      <section className="form-section bg-light mx-3 mx-md-0">
        <div className="row mt-0">
          <div className="col-md-6 mx-auto bg-white box_shadow mt-3 py-3 rounded">
            <form
              action=""
              // method="POST"
              // onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  required
                />
                <div id="emailHelp" className="form-text">
                  Enter your credincials to login
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="dateRegistered" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="dateRegistered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Link to="/forgot-password">
                  {" "}
                  <div id="emailHelp" className="form-text text-primary">
                    Enter your credincials to login
                  </div>
                </Link>
              </div>
              <button
                type="submit"
                className="btn login_button btn-primarys text-white fw-bold w-100"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
