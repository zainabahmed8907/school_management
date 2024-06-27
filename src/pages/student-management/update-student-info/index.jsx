import { useEffect, useState } from "react";
import "./updatestudentinfo.css";
import DatePicker from "react-datepicker";
import axiosInstance from "../../../api/config";
import useDebounce from "../../../utils/useDebounce";

const UpdateStudentInfo = () => {
  //variable for capturing student Id
  const [studentId, setStudentId] = useState("");

  //variable for storing student details based on student ID
  const [studentDetails, setStudentDetails] = useState([]);

  //variables for storing student and parent info
  const [dateOfbirth, setDateOfBirth] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [classes, setClasses] = useState([]);
  const debouncedStudentId = useDebounce(studentId, 1000);

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

  //capture student Id value while typing  for fetching details
  const handleStudentId = (e) => {
    setStudentId(e?.target.value);
  };

  //capture values of the field/s
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
  };

  //fetch student info
  const getStudentInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `/get-student-info?student_id=${studentId}`
      );
      const data = response.data;
      setStudentDetails(data);
      setStudentInfo({
        ...studentInfo,
        studentName: data[0]?.student_name,
        Gender: data[0]?.gender,
        classId: data[0]?.class_id,
        feeDetails: {
          Tution_fee: data[0]?.tution_fee,
          annual_charges: data[0]?.annual_charges,
          misc_charges: data[0]?.misc_charges,
          misc_Charge_Desc: data[0]?.misc_charge_desc,
          Paid_amount: data[0]?.Paid_amount,
        },
      });
      setParentInfo({
        ...parentInfo,
        fatherName: data[0]?.father_name,
      });
    } catch (e) {
      console.log(e);
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

  //method to update student info
  const updateStudentInfo = async (e) => {
    e.preventDefault();
  };



  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="updateStudentInfo">
      <p className="studentIdHeading fw-bold">Enter Student Id</p>
       <div className="d-flex align-items-center">
       <input
        id="updateStudentId"
        type="number"
        placeholder="Student Id"
        name="student_id"
        onChange={handleStudentId}
        value={studentId}
      />
        <button className="enterBtn" onClick={getStudentInfo}>Enter</button>
      
       </div>
      {studentDetails?.length > 0 && (
        <form className="registerStudentForm mt-3" onSubmit={updateStudentInfo}>
          <h3 className="pb-3 fw-bold">Student Information</h3>

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
              <option value="">Enter Gender</option>
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
              <option value="">Enter Class</option>
              {classes.map((classe, i) => (
                <option value={classe?.ClassID} key={i}>
                  {classe?.ClassName}
                </option>
              ))}
            </select>
          </div>

          <h3 className="pb-3 fw-bold">Parent Information</h3>
          <div className="d-flex flex-wrap pb-4">
            <input
              type="text"
              placeholder="Enter father/guardian name"
              name="fatherName"
              onChange={handleParentInfoChnage}
              value={parentInfo.fatherName}
            />
            <input
              type="text"
              placeholder="Enter father/guardian  CNIC"
              name="fatherCNIC"
              onChange={handleParentInfoChnage}
              value={parentInfo.fatherCNIC}
            />
            <input
              type="text"
              placeholder="Enter father/guardian mobile number"
              name="fatherMobile"
              onChange={handleParentInfoChnage}
              value={parentInfo.fatherMobile}
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
            />
          </div>

          <h3 className="pb-3 fw-bold">Fee Details</h3>
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

          <h3 className="pb-3 fw-bold">Payment Info</h3>
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
            <button type="submit" className="border-0 px-5 py-2" id="updatebtn">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateStudentInfo;
