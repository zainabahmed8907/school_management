import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/config";
import "./checkstudentinfo.css";
import Select from "react-select";
import BounceLoader from "react-spinners/BounceLoader";
import useDebounce from "../../../utils/useDebounce";


const CheckStudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClass, setSelectedClass] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [url, setUrl] = useState("");
  const [selectClassName, setSelectedClassName] = useState("");
  const [student, setStudent] = useState({});
  const debouncedStudentId = useDebounce(studentId, 1000);

  //fetch latest 5 records of student
  const getLatestFiveStudents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/latest-five-students");
      const data = await response.data;
      setStudents(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //fetch classes to display in a select box
  const getClasses = async () => {
    try {
      const response = await axiosInstance.get("/classes/user");
      const data = response.data;

      setClasses(
        data
          ?.map((c) => [
            {
              value: c?.ClassID,
              label: c?.ClassName,
            },
          ])
          .flat()
      );
    } catch (e) {
      console.log(e);
    }
  };

  //fetch student info
  const getStudentInfo = async () => {
    try {
      if (url?.length > 0) {
        const response = await axiosInstance.get(url);
        const data = response.data;
        setStudentDetails(data);
        if (studentId) {
          setStudent(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  //set class Name on entering into class field
  const handleClasssChange = (e) => {
    setSelectedOption(e?.value);
    setSelectedClassName(e[0]?.label);
    setSelectedClass(e?.map((el) => el?.value));
  };

  //set student Id on entering into field
  const handleStudentId = (e) => {
    setStudentId(e?.target.value);
  };

  useEffect(() => {
    getClasses();
  },[]);

  useEffect(()=>{
    getLatestFiveStudents();

  },[studentId])



  useEffect(() => {
    if (studentId) {
      setUrl(`/get-student-info?student_id=${studentId}`);
    }
    if (selectedClass?.length > 0 && studentId) {
      setUrl(
        `/get-student-info?student_id=${studentId}&class_id=${selectedClass}`
      );
    }
    if (selectedClass.length > 0) {
      setUrl(`/get-student-info?class_id=${selectedClass}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, selectedClass]);

  return (
    <>
      <p className="studentInfoHeadline">Enter Student Id or Class Id/s</p>

      <div className="pt-1 checkStudentInfo d-flex align-items-center">
        <input
          type="number"
          placeholder="Enter Student Id"
          name="student_id"
          onChange={handleStudentId}
          value={studentId}
        />
        <p className="me-2  ">OR</p>
        <Select
          placeholder="Select Class/es"
          isMulti
          defaultValue={selectedOption}
          onChange={handleClasssChange}
          options={classes}
          className="multi-select p-1 cursor-pointer"
        />

        <button className="enterBtn" onClick={getStudentInfo}>Enter</button>
      </div>

      {Object.keys(student)?.length > 0 && studentId && (
        <div className="card student-record rounded w-50 h-50 py-5 mt-5 m-auto p-3">
          <div className="p-2 card-inner">
            <p className="studentName">{student[0]?.student_name}</p>
            <div className="d-flex pe-4">
              <p>Name:</p>
              <p className="ms-2 pe-4">{student[0]?.student_name}</p>
            </div>
            <div className="d-flex pe-4">
              <p>Father's Name:</p>
              <p className="ms-2">{student[0]?.father_name}</p>
            </div>
            <div className="d-flex pe-4">
              <p>Class Name:</p>
              <p className="ms-2">{student[0]?.class_name}</p>
            </div>
            <div className="d-flex pe-4">
              <p>Gender:</p>
              <p className="ms-2">{student[0]?.gender}</p>
            </div>
            <div className="d-flex pe-4">
              <p>Student Id:</p>
              <p className="ms-2">{student[0]?.student_id}</p>
            </div>
            <div className="d-flex pe-4">
              <p>Status:</p>
              <p className="ms-2">{student[0]?.status}</p>
            </div>
          </div>
        </div>
      )}
      {
        Object.keys(studentDetails)?.length > 1 &&
        selectedClass?.length > 0 && (
          <div>
            <p className="mt-3" id="className">
              Students of {selectClassName} class
            </p>
            <div className="d-flex justify-content-center studentsTable">
              <div className="d-flex justify-content-center w-100 card">
                <div className="table-container">
                  <table className="m-auto">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Father's Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDetails?.map((student, i) => (
                        <tr
                          className={`row1 ${i % 2 === 0 ? "even" : "odd"}`}
                          key={student?.student_id}
                        >
                          <td>{student?.student_id}</td>
                          <td>{student?.student_name}</td>
                          <td>{student?.father_name}</td>
                          <td>{student?.gender}</td>
                          <td>{student?.class_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      {
        students?.length > 0 && !studentId &&
       (
          <div className="d-flex justify-content-center studentsTable" id="">
            {loading ? (
              <>
                <BounceLoader color="#4154f1" />
              </>
            ) : (
              <div className="d-flex justify-content-center w-100 card">
                <div className="table-container">
                  <table className="m-auto">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Father's Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.map((student, i) => (
                        <tr
                          className={`row1 ${i % 2 === 0 ? "even" : "odd"}`}
                          key={student?.student_id}
                        >
                          <td>{student?.student_id}</td>
                          <td>{student?.student_name}</td>
                          <td>{student?.father_name}</td>
                          <td>{student?.gender}</td>
                          <td>{student?.class_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default CheckStudentInfo;
