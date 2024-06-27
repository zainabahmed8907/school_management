import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../../api/config";
import moment from "moment/moment";
import "./dailyaccountstatus.css";
import BounceLoader from "react-spinners/BounceLoader";

const DailyAccountStatus = () => {
  const [accountStatus, setAccountStatus] = useState();
  const [expenses, setExpenses] = useState([]);
  const [feeCollection, setFeeCollection] = useState([]);
  const [paidFee, setPaidFee] = useState();
  const [dueFee, setDueFee] = useState();
  const [expenseAmount, setExpenseAmount] = useState();
  const [totalforToday, setTotalForToday] = useState();

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
  //get filtered expenses for today
  const dailyExpensesforToday = async () => {
    try {
      const response = await axiosInstance.get(
        "/reports/expenses?timeFrame=today"
      );
      const data = response.data;
      setExpenses(data);
      setExpenseAmount(data?.map((d) => d?.amount));
    } catch (e) {
      console.log(e);
    }
  };

  //get filtered collection records for today
  const getFeeCollectionRecords = async () => {
    try {
      const response = await axiosInstance.get(
        "/reports/paid-fees?timeFrame=today"
      );
      const data = response.data;
      setFeeCollection(data);
      setPaidFee(data?.reduce((a, c) => a + c?.paid_amount, 0));
      setDueFee(data?.reduce((a, c) => a + c?.total_amount_due, 0));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAccountStatus();
    dailyExpensesforToday();
    getFeeCollectionRecords();
  }, []);

  useEffect(() => {
    if (paidFee && dueFee && expenseAmount) {
      setTotalForToday(paidFee - dueFee + expenseAmount);
    }
  }, [dueFee, paidFee, expenseAmount]);

  return (
    <React.Suspense fallback={<BounceLoader />}>
      <div className="account_status">
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

      <div className="fee-collection-records mb-2">
        <div className="d-flex justify-content-between col-lg-8 col-12">
          <p className="heading">Fee Collection Records</p>
          <p className="date">{moment(Date.now()).format("DD-MM-YYYY")}</p>
        </div>
        <div className="card col-12 col-lg-8 p-1 accountDetailCard studentsTable">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Student Id</th>
                  <th>Collector Name</th>
                  <th>Payment Status</th>
                  <th>Paid Amount</th>
                  <th>Total Amount Due</th>
                </tr>
              </thead>
              <tbody>
                {feeCollection?.map((account, i) => (
                  <tr
                    className={`${i % 2 === 0 ? "even" : "odd"}`}
                    key={account?.student_id}
                  >
                    <td>{account?.student_id}</td>
                    <td>{account?.collector_name}</td>
                    <td>
                      <p
                        className="text-align-center"
                        id={`${
                          account?.payment_status == "PARTIAL PAID"
                            ? "partialPaid"
                            : account?.payment_status == "PAID"
                            ? "paid"
                            : account?.payment_status == "ADVANCE PAID"
                            ? "advancePaid"
                            : "notPaid"
                        }`}
                      >
                        {account?.payment_status}
                      </p>
                    </td>
                    <td>{account?.paid_amount}</td>
                    <td>{account?.total_amount_due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-between col-lg-8 col-12">
          <p className="heading">Fee Total</p>
        </div>
        <div className="card col-12 col-lg-3 p-3 accountDetailCard">
          <div className="p-3 card-inner rounded">
            <div className="card-details">
              <div className="d-flex flex-wrap">
                <div className="me-5 my-3">
                  <p className="fieldName">Fee Paid</p>
                  <p className="fieldDetail" id="paidAmmount">
                    {paidFee}
                  </p>
                </div>

                <div className="me-5 my-3">
                  <p className="fieldName">Fee Due</p>
                  <p className="fieldDetail" id="dueAmount">
                    {dueFee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5  w-100 border border-primary"></div>
      <div className="today-expenses mb-2">
        <div className="d-flex justify-content-between col-lg-8 col-12">
          <p className="heading">Today's Expenses</p>
          <p className="date">{moment(Date.now()).format("DD-MM-YYYY")}</p>
        </div>
        <div className="row">
          <div className="card col-lg-8 col-sm-12 p-1 accountDetailCard studentsTable">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Expense Id</th>
                    <th>Expenses Account Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses?.length > 0 &&
                    expenses?.map((exp, i) => (
                      <tr
                        key={exp?.exp_id}
                        className={`${i % 2 === 0 ? "even" : "odd"}`}
                      >
                        <td>{exp?.exp_id}</td>
                        <td>{exp?.exp_acct_name}</td>
                        <td>{exp?.exp_desc}</td>
                        <td>{exp?.exp_type}</td>
                        <td>{exp?.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="total-sum">
        <div className="d-flex justify-content-between col-lg-8 col-12">
          <p className="heading">Expenses Total</p>
        </div>
      </div>
      <div className="card col-12 col-lg-3 p-3 accountDetailCard">
        <div className="p-3 card-inner rounded">
          <div className="card-details">
            <div className="d-flex flex-wrap">
              <div className="me-5 my-3">
                <p className="fieldName">Total Expense Amount</p>
                <p className="fieldDetail" id="paidAmmount">
                  {expenseAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
};

export default DailyAccountStatus;
