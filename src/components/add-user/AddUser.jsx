import React, { useState } from "react";
import "./add-user.css";
import axiosInstance from "../../api/config";

const AddUser = () => {
  //fields for adding school
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    username: "",
    password: "",
    email: "",
    user_contact_number: "",
    user_whatsapp_number: "",
    school_id: "",
    role_name: "",
  });

  //success variable if school added successfully and if submission failed
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");

  //validation variables
  const [emailValidation, setEmailValidation] = useState("");

  //function to handle the disabled state of a submit btn
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  //function to handle the state change of fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      // Validate the email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(value);

      // Update email validation state based on the validation result
      setEmailValidation(
        isValidEmail ? "" : "Please enter a valid email address"
      );
    }
  };

  //function to handle the submit functionality of school
  const addSchool = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("register_user", formData);
      setSuccess(true);
      const data = response.data;
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          address: "",
          username: "",
          password: "",
          email: "",
          user_contact_number: "",
          user_whatsapp_number: "",
          school_id: "",
          role_name: "",
        });
      }, 3000);

      return data;
    } catch (e) {
      setFailedMsg(e?.response?.data?.message);
      setFailed(true);
      setTimeout(() => {
        setFailedMsg("");
        setFailed(false);
        setFormData({
          name: "",
          address: "",
          username: "",
          password: "",
          email: "",
          user_contact_number: "",
          user_whatsapp_number: "",
          school_id: "",
          role_name: "",
        });
      }, 3500);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 user-container rounded">
          <form className="py-4 px-3" id="add-school-form" onSubmit={addSchool}>
            {success && (
              <div
                className="alert alert-primary alert-dismissible fade show"
                role="alert"
              >
                User has been added successfully!
              </div>
            )}
            {failed && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {failedMsg}
              </div>
            )}
            <div className="container">
              <h3 className="mt-2">Enter User Details</h3>

              <div className="row mt-3">
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-person-add position-absolute ms-2"></i>
                    <input
                      name="name"
                      placeholder="Enter name"
                      type="text"
                      value={formData.name}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-house-door-fill position-absolute ms-2"></i>
                    <input
                      name="address"
                      placeholder="Enter address"
                      type="text"
                      value={formData.address}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-lg-5 mt-2">
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-person-fill position-absolute ms-2"></i>
                    <input
                      name="username"
                      placeholder="Enter username"
                      type="text"
                      value={formData.username}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-lock-fill position-absolute ms-2"></i>
                    <input
                      name="password"
                      placeholder="Enter password"
                      type="password"
                      value={formData.password}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-lg-5 mt-2">
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-envelope-open-fill position-absolute ms-2"></i>
                    <input
                      name="email"
                      placeholder="Enter email"
                      type="text"
                      value={formData.email}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    {emailValidation?.length > 0 && (
                      <p className="text-danger font-bold mt-1">
                        {emailValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-telephone-fill position-absolute ms-2"></i>
                    <input
                      name="user_contact_number"
                      placeholder="Enter user's contact number"
                      type="text"
                      value={formData.user_contact_number}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-lg-5 mt-2">
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-whatsapp position-absolute ms-2"></i>
                    <input
                      name="user_whatsapp_number"
                      placeholder="Enter user's whatsapp number"
                      type="text"
                      value={formData.user_whatsapp_number}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-backpack-fill position-absolute ms-2"></i>
                    <input
                      name="school_id"
                      placeholder="Enter school Id"
                      type="text"
                      value={formData.school_id}
                      className="w-100 border-0  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 mt-lg-5 mt-2">
                  <div className="d-flex align-items-center position-relative mt-4">
                    <i className="bi bi-bag-dash-fill position-absolute ms-2"></i>
                    <select
                      name="role_name"
                      placeholder="Enter user's role"
                      value={formData.role_name}
                      className="w-100  border-primary  rounded z-0 ps-m3 py-3"
                      onChange={handleInputChange}
                    >
                      <option value="Clerk">Clerk</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Student">Student</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Admin">Admin</option>
                      <option value="Student">Student</option>
                      <option value="Parent">Parent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mt-lg-5 mt-lg-5 mt-2">
                <div className="col-lg-6">
                  <button
                    type="submit"
                    className={`w-100 border-0 p-3 rounded text-white`}
                    id={isSubmitDisabled ? "disabled-btn" : "add-school-btn"}
                    disabled={isSubmitDisabled}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>

            <div id="background-wrap">
              <div class="bubble x1"></div>
              <div class="bubble x2"></div>
              <div class="bubble x3"></div>
              <div class="bubble x4"></div>
              <div class="bubble x5"></div>
              <div class="bubble x6"></div>
              <div class="bubble x7"></div>
              <div class="bubble x8"></div>
              <div class="bubble x9"></div>
              <div class="bubble x10"></div>
            </div>
            {/* <div style={{marginLeft:"-56px", marginTop:"-2px"}}>
                <img src="/assets/items/half-polygon.svg" alt=""  width={250}  id="bottom-polygon"/>
              </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
