import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/services/auth.service";
import Authenticated from "../../routes/Authenticated";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  //navigate variable
  const navigate = useNavigate();

  //dispatch variable to dispatch an action from the redux store.
  const dispatch = useDispatch();

  //fetch the state variable from redux store.
  const { auth, loading, data, error } = useSelector((state) => state.auth);

  //state variables for username and password fields.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //this functionality of this field is to check whether all the fields of the Login form are filled,
  //once filled the submit button will get enabled other wise it
  //will be disabled i.e. user cannot click on it.
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  //function for checking and storing the form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //function to handle the form submit logic.
  const handleSubmit = async (e) => {
    e.preventDefault();

    //dispatch the loginUser functionality from the store, endpoint of login has been implemented in loginUser() function.
    await dispatch(loginUser(formData));

    //if user get authenticated, the route will be changed to "dashboard"
    if (auth) {
      navigate("/dashboard");
    }
    else{
      return;
    }

   
  };


  return (
    <div className="d-flex justify-content-center">
      <div
        className="w-75  m-lg-5 d-flex flex-lg-row 
      flex-column justify-content-center align-items-center bg-secondary-light rounded"
        id="main_container"
      >
        <div className="m-5 d-sm-flex justify-content-center d-lg-block">
          <img
            src="assets/items/login.svg"
            alt=""
            className="w-100 w-sm-50  "
          />
        </div>
        <div>
          <div
            className="vw-50 px-4 rounded m-4 py-5 lg:m-0 bg-white "
            id="login-container"
          >
            <div id="login-icon">
              <img src="assets/items/user-login.png" alt="" width={50} />
            </div>
            <p className="login_heading">
              Welcome to <span> Admin Dashboard</span>
            </p>

            <div className="form d-flex flex-column justify-content-center h-75">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center position-relative">
                  <i className="bi bi-person-fill position-absolute ms-2"></i>
                  <input
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                    className="w-100 border-0  rounded z-0 ps-m3 py-3"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-4 d-flex align-items-center position-relative">
                  <i
                    className="bi bi-key-fill position-absolute ms-2"
                    style={{ zIndex: 40 }}
                  ></i>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="w-100 border-0  rounded z-0 ps-m3 py-3"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className={`w-100 border-0  py-3 rounded text-white ${
                      isSubmitDisabled ? "disabled_btn" : "btn"
                    }`}
                    disabled={isSubmitDisabled}
                  >
                    {loading ? (
                      <div className="spinner-grow text-light" role="status">
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
