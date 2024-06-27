import DatePicker from "react-datepicker";
import "./addstudent.css";

import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../api/config";

const AddStudent = () => {
  //state variables for storing student and parent info
  const [dateOfbirth, setDateOfBirth] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [classes, setClasses] = useState([]);

  //success message and error message variables
  const [successMsg, setSuccessMsg] = useState(false);
  const [failedMsg, setFailedMsg] = useState(false);
  const [numberValidationMsg, setNumberValidationMsg] = useState("");
  const [CNICValidtion, setCNICValidationMsg] = useState("");
  const [homeContactValidation, setHomeContactValdiation] = useState("");
  const [isObjectValid, setIsObjectValid] = useState(true);

  //numeric regex
  const numericRegex = /^-?\d*\.?\d+$/;

  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    Gender: "",
    Date_of_birth: null,
    Prev_School: "",
    Admission_Date: null,
    classId: "",
    feeDetails: {
      Tution_fee: "",
      Admission_Fee: "",
      Security_Deposit: "",
      annual_charges: "",
      misc_charges: "",
      misc_Charge_Desc: "",
      Paid_amount: "",
    },
  });
  const [parentInfo, setParentInfo] = useState({
    fatherName: "",
    fatherCNIC: "",
    fatherMobile: "",
    homeAddress: "",
    homeLandmark: "",
    homeContactNo: "",
  });

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevData) => ({
      ...prevData,

      [name]: value,
      Date_of_birth: dateOfbirth,
      Admission_Date: admissionDate,
      feeDetails: {
        ...studentInfo.feeDetails,
        [name]: value,
      },
    }));
  };
  const handleParentInfoChnage = (e) => {
    const { name, value } = e.target;

    setParentInfo((prevData) => ({
      ...prevData,

      [name]: value,
    }));
    if (name == "fatherMobile") {
      if (!numericRegex.test(value)) {
        setNumberValidationMsg("Please enter a numeric value");
      } else {
        setNumberValidationMsg("");
      }
    }
    if (name == "fatherCNIC") {
      if (!numericRegex.test(value)) {
        setCNICValidationMsg("Please enter a numeric value");
      } else {
        setCNICValidationMsg("");
      }
    }
    if (name == "homeContactNo") {
      if (!numericRegex.test(value)) {
        setHomeContactValdiation("Please enter a numeric value");
      } else {
        setHomeContactValdiation("");
      }
    }
  };

  //fetch student classes
  const getClasses = async () => {
    try {
      const response = await axiosInstance.get("/classes/user");
      const data = response.data;
      setClasses(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSchools = async () => {
    try {
      const response = await axiosInstance.get("/schools");
      const data = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  //submit student info method
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/register-student", {
        studentInfo,
        parentInfo,
      });
      const data = response.data;
      setSuccessMsg(true);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 3000, // Auto close the toast after 3 seconds
      });
      setTimeout(() => {
        setStudentInfo({
          studentName: "",
          Gender: "",
          Date_of_birth: null,
          Prev_School: "",
          Admission_Date: null,
          classId: "",
          feeDetails: {
            Tution_fee: "",
            Admission_Fee: "",
            Security_Deposit: "",
            annual_charges: "",
            misc_charges: "",
            misc_Charge_Desc: "",
            Paid_amount: "",
          },
        });
        setParentInfo({
          fatherName: "",
          fatherCNIC: "",
          fatherMobile: "",
          homeAddress: "",
          homeLandmark: "",
          homeContactNo: "",
        });
        setAdmissionDate(null);
        setDateOfBirth(null);
      }, 2500);
      return data;
    } catch (e) {
      setFailedMsg(true);
      toast.error(e?.response?.data?.message?.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        setStudentInfo({
          studentName: "",
          Gender: "",
          Date_of_birth: null,
          Prev_School: "",
          Admission_Date: null,
          classId: "",
          feeDetails: {
            Tution_fee: "",
            Admission_Fee: "",
            Security_Deposit: "",
            annual_charges: "",
            misc_charges: "",
            misc_Charge_Desc: "",
            Paid_amount: "",
          },
        });
        setParentInfo({
          fatherName: "",
          fatherCNIC: "",
          fatherMobile: "",
          homeAddress: "",
          homeLandmark: "",
          homeContactNo: "",
        });
        setAdmissionDate(null);
        setDateOfBirth(null);
      }, 2500);
    }
  };

  useEffect(() => {
    // Check if all fields are filled in studentInfo and parentInfo
    const isStudentInfoFilled = Object.values(studentInfo).every(
      (value) => value !== ""
    );
    const isParentInfoFilled = Object.values(parentInfo).every(
      (value) => value !== ""
    );

    // Enable or disable submit button based on the condition
    setIsObjectValid(!(isStudentInfoFilled && isParentInfoFilled));
  }, [studentInfo, parentInfo]);

  useEffect(() => {
    getClasses();
    getSchools();
  }, []);

  return (
    <>
      <div>
        <h3 className="pt-3">Student Information</h3>
        <ToastContainer />
        <form className="registerStudentForm mt-3" onSubmit={addStudent}>
          <div className="d-flex flex-wrap pb-4">
            <input
              type="text"
              name="studentName"
              placeholder="Student name"
              value={studentInfo.studentName}
              onChange={handleStudentInputChange}
            />
            <select
              name="Gender"
              placeholder="Enter Gender"
              value={studentInfo.Gender}
              onChange={handleStudentInputChange}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Date of Birth"
              name="Date_of_birth"
              className="custom-datepicker"
              showYearDropdown
              value={dateOfbirth}
              selected={dateOfbirth}
              onChange={(date) => setDateOfBirth(date)}
            />
            <input
              type="text"
              placeholder="Previous school name"
              name="Prev_School"
              value={studentInfo.Prev_School}
              onChange={handleStudentInputChange}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Admission Date"
              name="Admission_Date"
              className="custom-datepicker"
              value={admissionDate}
              selected={admissionDate}
              onChange={(date) => setAdmissionDate(date)}
            />
            <select
              name="classId"
              placeholder="Enter Class ID"
              value={studentInfo.classId}
              onChange={handleStudentInputChange}
            >
              <option value="" disabled hidden>
                Select Class
              </option>
              {classes?.map((classe, i) => (
                <option value={classe?.ClassID} key={i}>
                  {classe?.ClassName}
                </option>
              ))}
            </select>
          </div>

          <h3 className="pb-3">Parent Information</h3>
          <div className="d-flex flex-wrap pb-4">
            <input
              type="text"
              placeholder="Enter father/guardian name"
              name="fatherName"
              onChange={handleParentInfoChnage}
              value={parentInfo.fatherName}
            />
            <div>
              <input
                type="text"
                placeholder="Enter father/guardian  CNIC"
                name="fatherCNIC"
                className={`${CNICValidtion}` ? "cnicError" : ""}
                onChange={handleParentInfoChnage}
                value={parentInfo.fatherCNIC}
              />
            </div>
            <input
              type="text"
              placeholder="Enter father/guardian mobile number"
              name="fatherMobile"
              onChange={handleParentInfoChnage}
              value={parentInfo.fatherMobile}
              className={`${numberValidationMsg}` ? "phoneError" : ""}
            />
            <input
              type="text"
              placeholder="Enter Home Address"
              name="homeAddress"
              onChange={handleParentInfoChnage}
              value={parentInfo.homeAddress}
            />
            <input
              type="text"
              placeholder="Enter Address LandMarks"
              name="homeLandmark"
              onChange={handleParentInfoChnage}
              value={parentInfo.homeLandmark}
            />
            <input
              type="text"
              placeholder="Enter Home/Contat no."
              name="homeContactNo"
              onChange={handleParentInfoChnage}
              value={parentInfo.homeContactNo}
              className={`${homeContactValidation}` ? "homeContactError" : ""}
            />
          </div>

          <h3 className="pb-3">Fee Details</h3>
          <div className="d-flex flex-wrap pb-4">
            <input
              type="number"
              placeholder="Enter Tution Fee"
              name="Tution_fee"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.Tution_fee}
            />
            <input
              type="number"
              placeholder="Enter Admission Fee"
              name="Admission_Fee"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.Admission_Fee}
            />
            <input
              type="number"
              placeholder="Enter Security Deposit"
              name="Security_Deposit"
              value={studentInfo.feeDetails.Security_Deposit}
              onChange={handleStudentInputChange}
            />
            <input
              type="number"
              placeholder="Enter Annual Charges"
              name="annual_charges"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.annual_charges}
            />
            <input
              type="number"
              placeholder="Enter Misc Charges"
              name="misc_charges"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.misc_charges}
            />
            <input
              type="number"
              placeholder="Enter Misc Description"
              name="misc_Charge_Desc"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.misc_Charge_Desc}
            />
          </div>

          <h3 className="pb-3">Payment Info</h3>
          <div className="d-flex flex-wrap pb-4">
            <input
              type="number"
              placeholder="Enter Paid Amount"
              name="Paid_amount"
              onChange={handleStudentInputChange}
              value={studentInfo.feeDetails.Paid_amount}
            />
          </div>

          <div className="d-flex justify-content-end me-3 mb-5">
            <button
              type="submit"
              className="border-0 px-5 py-2"
              id={isObjectValid ? "disabled-btn" : "register-btn"}
              disabled={isObjectValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
