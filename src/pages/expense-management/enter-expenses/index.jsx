import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/config";
import "./enterexpenses.css";
import { ToastContainer, toast } from "react-toastify";
import SubmitConfrimationModal from "../../../components/submit-modal/SubmitConfirmationModal";
import BounceLoader from "react-spinners/BounceLoader";
import RecentExpenseTable from "../../../components/dashboard/recent-sales/RecentExpenseTable";
import "../../../components/dashboard/recent-sales/recentSales.css";

const EnterExpenses = () => {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

  //variable for storign field values
  const [formData, setFormData] = useState({
    expenseType: "",
    expenseAmount: "",
    expensePayAccount: "Cash in hand account ",
    invoiceNumber: "",
    invoiceFileNumber: "",
    expenseDescription: "",
    exp_time: new Date().toLocaleTimeString("en-US"),
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [accountStatus, setAccountStatus] = useState();

  //variable for storing account details
  const [accountDetails, setAccountDetails] = useState([]);
  const [accountBalance, setaAccountdBalance] = useState();

  //erecentexpenses variable
  const [recentExpenses, setRecentExpenses] = useState([]);

  //variable for expense types
  const [expenseTypes, setSexpenseTypes] = useState([]);

  //variable for showing current time in a time field

  //variable for checking if all the form fields are filed
  const isFormFilled =  Object.values(formData).every((values) => values == "");

  //store field values in formData while typing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //fetch account details
  const getAccountNames = async () => {
    try {
      const response = await axiosInstance.get("/account-details");
      const data = response.data;
      setAccountDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  //fetch recent expenses

  const fetchRecentExpenses = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/recent-expenses");
      const data = response.data;
      setRecentExpenses(data);
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

  //fetch expense type names from the backend
  const getExpenseTypeNames = async () => {
    try {
      const response = await axiosInstance.get("/expense-types");
      const data = response.data;
      setSexpenseTypes(data);
    } catch (e) {}
  };

  //handle expense submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if amount entered is greater than the account balance, skip submission else proceed to submission
    if (formData.expenseAmount > accountBalance?.current_bal) {
      toast.error("Your account balance is less than your entered emount", {
        position: "top-right",
        autoClose: 3000, // Auto close the toast after 3 seconds
      });
      return;
    } else {
      //proceed to submission
      try {
        setLoading(true);
        const response = await axiosInstance.post("/submit-expense", formData);
        const data = response.data;
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
        setTimeout(() => {
          setFormData({
            expenseType: "",
            expenseAmount: "",
            expensePayAccount: "",
            invoiceNumber: "",
            invoiceFileNumber: "",
            expenseDescription: "",
          });
        }, 1500);
        setisSubmitted(true);
        setLoading(false);
        fetchRecentExpenses();
        getAccountStatus();
        return data;
      } catch (e) {
        setLoading(false);
        toast.error(e?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
        setTimeout(() => {
          setFormData({
            expenseType: "",
            expenseAmount: "",
            expensePayAccount: "",
            invoiceNumber: "",
            invoiceFileNumber: "",
            expenseDescription: "",
          });
        }, 2500);
      }
    }
  };

  useEffect(() => {
    getAccountNames();
    getExpenseTypeNames();
  }, []);

  useEffect(() => {
    if (accountDetails.length > 0) {
      setaAccountdBalance(
        accountDetails?.find(
          (d) => d?.Acct_type_name == formData.expensePayAccount
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.expensePayAccount]);

  return (
    <>
      <ToastContainer />
      <div className="card col-lg-3 col-12 p-3 accountDetailCard">
        <div className="p-3 card-inner rounded">
          <div className="card-details">
            <div className="d-flex justify-content-between heading">
              <p className="fw-bold">Account Name</p>
              <p className="fw-bold">Details</p>
            </div>

            {accountDetails?.map((account) => (
              <div className="d-flex justify-content-between details">
                <p>{account?.Acct_type_name}</p>
                <p>{account?.current_bal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="expenses-details-fields mb-4">
        <p className="heading">Enter Expense Details</p>

        <div className="expense-form">
          <form onSubmit={handleSubmit} className="d-flex flex-wrap ">
            <div className="d-flex align-items-center flex-wrap">
              <select
                name="expenseType"
                value={formData.expenseType}
                onChange={handleFormChange}
              >
                <option value="" disabled hidden>
                  Expense Type
                </option>
                {expenseTypes?.map((expense, i) => (
                  <option
                    key={expense?.exp_type_id}
                    value={expense?.exp_type_name}
                  >
                    {expense?.exp_type_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="expenseAmount"
                placeholder="Expense Amount"
                onChange={handleFormChange}
                value={formData.expenseAmount}
              />

              <select
                name="expensePayAccount"
                onChange={handleFormChange}
                value={formData.expensePayAccount}
              >
                {accountDetails?.map((acc, i) => (
                  <option key={acc?.Acct_type_name} value={acc?.Acct_type_name}>
                    {acc?.Acct_type_name}
                  </option>
                ))}
              </select>
              <input
                type="time"
                disabled
                className="d-flex align-items-center"
                defaultValue={currentTime}
              />
            </div>

            {/* <input type="time" defaultValue={currentTime} /> */}

            <div className="d-flex align-items-center flex-wrap">
              <input
                type="text"
                name="invoiceNumber"
                placeholder="Invoice Number"
                value={formData.invoiceNumber}
                onChange={handleFormChange}
              />

              <input
                type="text"
                name="invoiceFileNumber"
                placeholder="Invoice File Number"
                value={formData.invoiceFileNumber}
                onChange={handleFormChange}
              />

              <textarea
                rows={2}
                cols={91}
                placeholder="Expense Description"
                name="expenseDescription"
                maxLength={250}
                value={formData.expenseDescription}
                onChange={handleFormChange}
              />
            </div>

            <div className="submitbtn">
              {/**if the expense amount is negative, then the button will show up which will open a modal else the submit button will appear*/}
              {formData.expenseAmount < 0 ? (
                <button
                  type={"button"}

                  className={`enabled mt-3`}
                  data-bs-toggle="modal"
                  data-bs-target="#submitFeeModal"
                >
                  Submit Expense
                </button>
              ) : (
                <button
                  type={"submit"}
                  className={`enabled mt-3`}
                >
                  {loading ? (
                    <BounceLoader size={18} color="white" />
                  ) : (
                    "Submit Expense"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <SubmitConfrimationModal
          message={"You entered a negative Amount"}
          handleFeeSubmit={handleSubmit}
        />
      </div>

      {isSubmitted && (
        <>
          <p className="heading">Recent Expenses</p>

          <RecentExpenseTable items={recentExpenses} />

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
        </>
      )}
    </>
  );
};

export default EnterExpenses;
