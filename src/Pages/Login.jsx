import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { DataContext } from "../Components/TheContext";
import { DataContext } from "../Components/TheContext";

const Login = () => {
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

  useEffect(() => {
    setFakeAuthService({ ...fakeAuthService, isAuthenticated: false });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // the working code for authentication from an api *****
  const handleLogin = (event) => {
    event.preventDefault();

    axios

      // .post("http://127.0.0.1:8000/api/login/", formData)
      .post("https://talentbackend.onrender.com/api/login/", formData)
      .then((response) => {
        setFakeAuthService({ ...fakeAuthService, isAuthenticated: true });

        setFeedback(true);
        // navigate("/home", { overwriteLastHistoryEntry: true });
        navigate("/home");
        // redirect("/home");
      })
      .catch((error) => {
        setError(error);
        setFeedback(false);
      });
  };

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
            {feedback ? "Login Success" : `Password Error`}
          </span>
          <button
            type="button"
            className="btn-close d-none"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <h1 className="fw-bold text-center mt-3">
          <span className="text-danger">My</span> Todo{" "}
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
