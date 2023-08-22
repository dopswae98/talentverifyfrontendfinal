import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../Components/TheContext";
import logo from "../Images/talentlogo.png";

const Login = () => {
  const { fakeAuthService, setFakeAuthService, setToken, token } =
    useContext(DataContext);

  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    //initialise isAuthenticated: false so that the user will always be redirected to the
    // login page even if he enters manually a private route
    //so that when he logs out and presses back it will not enter a private route
    setFakeAuthService({ ...fakeAuthService, isAuthenticated: false });
    console.log("auth staus", fakeAuthService.isAuthenticated);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // the working code for authentication from an api *****
  const handleLogin = (event) => {
    event.preventDefault();

    setIsLoading(true);
    //validate user to provide non empty fields
    if (!formData.username || !formData.password) {
      setErrorText("Please Enter Your credentials");
      setIsLoading(false);
    } else {
      setErrorText(null);
    }
    //post code
    axios
      .post("https://talentbackend.onrender.com/api/login/", formData)
      .then((response) => {
        setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });
        setIsLoading(false);
        setFeedback(true);
        navigate("/home");
        // localStorage.setItem("token", true);
        setToken(true);
        console.log("tokkkennn",token);
      })
      .catch((error) => {
        // if(error.status === 400){
        //   setError("Please Enter correct Password");
        //   setFeedback(false);
        //   console.log(error);
        //   setIsLoading(false);
        // }
        // setError(error);
        setFeedback(false);
        console.log(error.response);
        setIsLoading(false);

        setError("Password/Network Error");
      });
  };
  console.log("fake auth login", fakeAuthService.isAuthenticated);
  return (
    <div>
      <div className="bg-light overflow-hidden vh-100">
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
            {feedback ? "Login Success" : `${error} `}
            {errorText ? errorText : errorText}
          </span>
          <button
            type="button"
            className="btn-close d-none"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        {isLoading && (
          <div className="loader position-absolute top-0 right-0 left-0 bottom-0 d-flex justify-content-center add_modal w-100 align-items-center">
            <div
              className="spinner-border bg-success text-warning fw-bold h1 fs-1s"
              role="status"
              style={{ fontSize: 30, height: 110, width: 110 }}
            ></div>
          </div>
        )}
        <h1 className="fw-bold text-center mt-3">
          <span className="me-2">
            <img src={logo} alt="logo" height={47} width={47} />
          </span>
          <span className="text-success">Talent</span> Verify{" "}
          <span className="text-success"> App</span>
        </h1>
        <section className="form-section bg-light mx-3 mx-md-0">
          <div className="row mt-0">
            <div className="col-md-6 mx-auto bg-white box_shadow mt-3 py-3 rounded">
              <form action="">
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
    </div>
  );
};

export default Login;
