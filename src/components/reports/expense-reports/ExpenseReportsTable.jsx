import moment from "moment";
import React from "react";
import { monthNames } from "../../../constants";
import { BounceLoader } from "react-spinners";
const ExpenseReportsTable = ({
  startDate,
  endDate,
  filteredValue,
  currentMonth,
  loading,
  expenseReports,   
}) => {
  return (
    <div>
      <div className="feeCollectionTable">
        <p className="mt-3">
          {startDate && endDate
            ? `Expense Records from ${moment(startDate).format(
                "YYYY-MM-DD"
              )} to ${moment(endDate).format("YYYY-MM-DD")}`
            : filteredValue == "thisMonth"
            ? `Expense Records for ${monthNames[currentMonth]}`
            : `Expense Records for ${
                filteredValue.charAt(0).toUpperCase() +
                filteredValue.substring(1)
              }`}
        </p>
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-fees-center">
            <>
              <BounceLoader size={50} color="blue" />
            </>
          </div>
        ) : (
          <div className="d-flex justify-content-center studentsTable">
            {expenseReports?.length > 0 && (
              <div className="w-100 card">
                <div className="table-container">
                  <div className="table-responsive w-100">
                    <table>
                      <thead>
                        <tr>
                          <th>Expense ID</th>
                          <th>Amount </th>
                          <th>Expense Type</th>
                          <th>Expense Description</th>
                          <th>Expense Account Name</th>
                          <th>INV_NUM</th>
                          <th>Time</th>

                          <th>User Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenseReports?.map((fee, index) => (
                          <tr
                            key={fee?.exp_id}
                            className={`${index % 2 === 0 ? "even" : "odd"}`}
                          >
                            <td>{fee?.exp_id}</td>
                            <td>{fee?.amount}</td>
                            <td>{fee?.exp_type}</td>
                            <td>{fee?.exp_desc}</td>
                            <td>{fee?.exp_acct_name}</td>
                            <td>{fee?.inv_num}</td>
                            <td>{moment(fee?.exp_time).format("hh:mm A")}</td>

                            <td>{fee?.user_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReportsTable;
