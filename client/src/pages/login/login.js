import React, { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import "./login.css";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos } from "../../features/userSavedPhotos/userSavedPhotosSlice";
import store from "../../app/store";

function Login(props) {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Define React Redux functions
  const userSavedPhotos = useSelector((state) => state.userSavedPhotos.savedPhotos);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    };

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      props.setLogin(true);
      const { token, user } = await response.json();
      console.log(user);
      dispatch(saveSavedPhotos(user.savedPics));
      login(token);
      navigate("/");
    } catch (err) {
      console.error(err);
    };

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <section id="background">
        <div className="container h-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100"
            id="formbg"
          >
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Welcome Back!
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={userFormData.email}
                              name="email"
                              onChange={handleInputChange}
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={userFormData.password}
                              name="password"
                              type="password"
                              onChange={handleInputChange}
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleFormSubmit}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                        className="img-fluid"
                        alt="Sample view"
                        id="loginFormImg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
