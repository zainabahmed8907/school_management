import React, { useEffect, useState } from "react";
import "./collectfee.css";
import BounceLoader from "react-spinners/BounceLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../api/config";
import SubmitConfrimationModal from "../../../components/submit-modal/SubmitConfirmationModal";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment/moment";

const CollectFee = () => {
  const [studentId, setStudentId] = useState("");
  const [rowStart, setRowStart] = useState(1);
  const [rowEnd, setRowEnd] = useState(5);
  const [accountName, setAccountName] = useState("");
  const [amountPaid, setAmountPaid] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [studentInfoError, setStudentInfoError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [accountStatus, setAccountStatus] = useState();
  const [loadMore, setLoadMore] = useState(false);
  //variable for storing fee records
  const [feeRecord, setFeeRecord] = useState([]);

  //variable for storing student Info
  const [studentData, setStudentData] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    student_id: "",
    name: "",
    gender: "",
    father_name: "",
    class_name: "",
    feeDetails: {
      feeId: "",
      payment_status: "",
      fee_month: "",
      fee_due_date: "",
      Tution_fee: "",
      annual_charges: "",
      stationary_charges: "",
      misc_charges: "",
      misc_Charge_Desc: "",
      previous_due_amount: "",
      total_amount_due: "",
      paid_amount: "",
    },
  });
  //laoding variable
  const [loading, setLoading] = useState(false);

  //variables for fetching account names
  const [accountNames, setAccountNames] = useState([]);

  //fetch fee records
  const getFeeRecords = async () => {
    try {
      const response = await axiosInstance.get(
        `/get-fee-records?student_id=${studentId}&row_start=${rowStart}&row_end=${rowEnd}`
      );
      const data = response.data;
      setFeeRecord(prev=>[...prev,  ...data]);
      console.log("Fee record", data);
    } catch (e) {
      console.log(e);
    }
  };

  //get account status
  const getAccountStatus = async () => {
    try {
      const response = await axiosInstance.get("/account-details");
      const data = response.data;
      setAccountStatus(data);
    } catch (e) {
      console.log(e);
    }
  };

  //fetch student info from student Id
  const getStudentInfo = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/get-student-info?student_id=${studentId}`
      );
      const data = response.data;

      setStudentData(data);
      setStudentInfo({
        ...studentInfo,
        student_id: data[0]?.student_id,
        name: data[0]?.student_name,
        gender: data[0]?.gender,
        father_name: data[0]?.father_name,
        class_name: data[0]?.class_name,
        feeDetails: {
          feeId: data[0]?.fee_id,
          payment_status: data[0]?.payment_status,
          Tution_fee: data[0]?.tution_fee,
          annual_charges: data[0]?.annual_charges,
          stationary_charges: data[0]?.stationary_charges,
          misc_charges: data[0]?.misc_charges,
          misc_Charge_Desc: data[0]?.misc_Charge_desc,
          previous_due_amount: data[0]?.previous_due,
          total_amount_due: data[0]?.total_amount_due,
          fee_month: data[0]?.fee_month,
          fee_due_date: new Date(data[0]?.fee_due_date).toLocaleDateString(),
          paid_amount: data[0]?.Paid_amount,
        },
      });

      setStudentInfoError(false);
    } catch (e) {
      setStudentInfoError(true);
      setError(e?.response?.data?.message);
    }
    setLoading(false);
  };
  //fetch account names
  const getAccountNames = async () => {
    try {
      const response = await axiosInstance.get("/account-details");
      const data = response.data;
      setAccountNames(data);
    } catch (e) {
      console.log(e);
    }
  };

  //handle student Id value while typing
  const handleStudentId = (e) => {
    setStudentId(e.target.value);
  };
  //handle Account Type when selected
  const handleAccountName = (e) => {
    setAccountName(e.target.value);
  };
  //handle paid amount
  const handlePaidAmount = (e) => {
    setAmountPaid(e.target.value);
  };

  //handle row count
  const handleRowCount = () => {
    setRowStart((prev) => prev + 1);
    setRowEnd((prev) => prev + 1);
  
  };

  //handle fee submission
  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    if (amountPaid) {
      try {
        setSubmitLoading(true);
        const response = await axiosInstance.post("/submit-fee", {
          student_id: studentInfo?.student_id,
          account_name:
            accountName?.length <= 0 ? "Cash in hand account" : accountName,
          paid_amount: amountPaid,
        });
        const data = response.data;
        setSuccess(true);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 2500, // Auto close the toast after 2.5 seconds
        });
        setTimeout(() => {
          setStudentId("");
          setAmountPaid("");
        }, 2500);
        setisSubmitted(true);

        // setTimeout(() => {
        //    setFeeRecord([]);
        //    setStudentData("");
        //    setStudentInfo([]);
        //    setAccountName("");

        // }, 5000);
        getFeeRecords();
        getStudentInfo();
        getAccountStatus();
        setSubmitLoading(false);
        return data;
      } catch (e) {
        setError(true);
        toast.error(e?.response.data?.message, {
          position: "top right",
          autoClose: 2500,
        });
      }
    } else {
      toast.error("Please enter amount to be paid", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
  };

  const closeModal = () => {
    setStudentInfoError(false);
    setStudentId("");
    setStudentData([]);
    setFeeRecord([]);
  };

  const getRecords = () => {
    setisSubmitted(false);
    setLoadMore(true);

    getFeeRecords();
    getStudentInfo();
  };

  useEffect(() => {
    if (loadMore) {
      getFeeRecords();
    }
  }, [rowStart, rowEnd]);

  useEffect(() => {
    getAccountNames();
  }, []);

  return (
    <>
      {studentInfoError && (
        <Popup open={true} onClose={() => setStudentInfoError(false)} modal>
          <p>{error}</p>

          <button className="close" onClick={closeModal}>
            ok
          </button>
        </Popup>
      )}
      <ToastContainer />
      <div className="collectFee pt-3 d-flex align-items-center">
        <div>
          <p className="studentIdHeadline">Enter Student Id</p>

          <input
            type="number"
            placeholder="Student Id"
            name="student_id"
            onChange={handleStudentId}
            value={studentId}
          />
          <button className="w-auto" onClick={getRecords}>
            Enter for First Time
          </button>
        </div>
      </div>

      {studentData?.length > 0 && !isSubmitted && (
        <div className="collectFee pt-3 d-flex align-items-center">
          <div className="py-3">
            <p className="studentIdHeadline">Enter Account Type</p>

            <select
              className=""
              onChange={handleAccountName}
              value={accountName}
              defaultValue={accountNames[0]?.Acct_type_name}
            >
              {accountNames?.map((acc, i) => (
                <option value={acc?.Acct_type_name} key={i}>
                  {acc?.Acct_type_name}
                </option>
              ))}
            </select>
          </div>
          <div className="py-3">
            <p className="studentIdHeadline">Enter Paid Amount</p>

            <input
              type="number"
              placeholder="Paid Amount"
              name="paid_amount"
              onChange={handlePaidAmount}
              value={amountPaid}
            />
          </div>

          <div className="py-3">
            {(studentInfo?.feeDetails?.payment_status == "PAID" ||
              studentInfo?.feeDetails?.payment_status == "ADVANCE PAID") && (
              <button
                type="button"
                className="mt-4"
                data-bs-toggle="modal"
                data-bs-target="#submitFeeModal"
                style={{
                  display:
                    studentInfo?.feeDetails?.payment_status === "PAID" ||
                    studentInfo?.feeDetails?.payment_status === "ADVANCE PAID"
                      ? "block"
                      : "hidden",
                }}
              >
                Submit Fee
              </button>
            )}

            {studentInfo?.feeDetails?.payment_status !== "PAID" &&
              studentInfo?.feeDetails?.payment_status !== "ADVANCE PAID" && (
                <button
                  type="submit"
                  className="mt-4 d-flex align-items-center justify-content-center"
                  onClick={handleFeeSubmit}
                  disabled={submitLoading}
                  style={{
                    display:
                      studentInfo?.feeDetails?.payment_status == "PAID" ||
                      studentInfo?.feeDetails?.payment_status == "ADVANCE PAID"
                        ? "hidden"
                        : "block",
                  }}
                >
                  {submitLoading ? (
                    <BounceLoader
                      color="white"
                      size={20}
                      className="d-flex align-items-center justify-content-center"
                    />
                  ) : (
                    "Submit Fee"
                  )}
                </button>
              )}
          </div>
        </div>
      )}
      {isSubmitted && (
        <div className="account_status mt-5">
          <p className="heading">Account Status</p>

          <div className="card col-12 col-lg-3 p-3 accountDetailCard mt-4 mb-5">
            <div className="p-3 card-inner rounded">
              <div className="card-details">
                <div className="d-flex justify-content-between heading">
                  <p className="fw-bold">Account Name</p>
                  <p className="fw-bold">Details</p>
                </div>

                {accountStatus?.map((account) => (
                  <div className="d-flex justify-content-between details">
                    <p>{account?.Acct_type_name}</p>
                    <p>{account?.current_bal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {studentData?.length > 0 &&
        !studentInfoError &&
        (loading ? (
          <div className="d-flex justify-content-center">
            <BounceLoader color="#4154f1" />
          </div>
        ) : (
          <>
            {!studentInfoError && (
              <div className="card w-100 h-50 studentRecordCard p-3">
                <div className="card-inner-container p-2">
                  <div className="d-flex flex-wrap">
                    <div className="me-5 my-3">
                      <p className="fieldName">Student Id</p>
                      <p className="fieldDetail">{studentInfo?.student_id}</p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Name</p>
                      <p className="fieldDetail">{studentInfo?.name}</p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Gender</p>
                      <p className="fieldDetail">{studentInfo?.gender}</p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Father Name</p>
                      <p className="fieldDetail">{studentInfo?.father_name}</p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Class</p>
                      <p className="fieldDetail">{studentInfo?.class_name}</p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Fee Id</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.feeId}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Payment Status</p>
                      <p
                        className="fieldDetail"
                        id={`${
                          studentInfo?.feeDetails?.payment_status ==
                          "PARTIAL PAID"
                            ? "partialPaid"
                            : studentInfo?.feeDetails?.payment_status == "PAID"
                            ? "paid"
                            : studentInfo.feeDetails?.payment_status ==
                              "ADVANCE PAID"
                            ? "advancePaid"
                            : "notPaid"
                        }`}
                      >
                        {studentInfo?.feeDetails?.payment_status}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Fee Month</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.fee_month}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Fee Due Date</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.fee_due_date}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Tution Fee</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.Tution_fee}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Annual Charges</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.annual_charges}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Stationary Charges</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.stationary_charges}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Misc Charges</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.misc_charges}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Misc Charges Desc</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.misc_Charge_Desc}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Previous Due Amount</p>
                      <p className="fieldDetail">
                        {studentInfo?.feeDetails?.previous_due_amount}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Total Due Amount</p>
                      <p className="fieldDetail" id="dueAmount">
                        {studentInfo?.feeDetails?.total_amount_due}
                      </p>
                    </div>
                    <div className="me-5 my-3">
                      <p className="fieldName">Paid Amount</p>
                      <p className="fieldDetail" id="paidAmmount">
                        {studentInfo?.feeDetails?.paid_amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {feeRecord?.length > 0 && !studentInfoError && (
              <div className="d-flex justify-content-center studentsTable">
                <div className="d-flex justify-content-center w-100 card">
                  <div className="table-container w-100">
                    <table className="m-auto">
                      <thead>
                        <tr>
                          <th>Student Id</th>

                          <th>Paid Amount</th>
                          <th>Tution Fee</th>
                          <th>Admission Fee</th>
                          <th>Misc Charges</th>
                          <th>Total Amount Due</th>

                          <th>Fee Month</th>
                          <th>Status</th>
                          <th>Pay Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeRecord?.map((fee, i) => (
                          <tr
                            className={`row1 ${i % 2 === 0 ? "even" : "odd"}`}
                            key={fee?.Fee_id}
                          >
                            <td>{fee?.student_id}</td>
                            <td>{fee?.Paid_amount}</td>
                            <td>{fee?.Tution_fee}</td>
                            <td>{fee?.admission_fee}</td>
                            <td>{fee?.misc_charges}</td>
                            <td>{fee?.total_amount_due}</td>
                            <td>{fee?.fee_month}</td>
                            <td>{fee?.payment_status}</td>
                            <td>
                              {moment(fee?.Pay_time).format(
                                "DD/MM/YYYY hh:mm a"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center align-items-center w-100 ">
                      <p className="loadMore" onClick={handleRowCount}>
                        Load More
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      <SubmitConfrimationModal
        handleFeeSubmit={handleFeeSubmit}
        message={
          "Fee has already been paid, are you sure you want to submit more fee”?"
        }
      />
    </>
  );
};

export default CollectFee;
