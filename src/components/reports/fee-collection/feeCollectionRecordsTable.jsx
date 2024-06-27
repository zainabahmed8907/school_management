import moment from "moment";
import React from "react";
import { monthNames } from "../../../constants";
import { BounceLoader } from "react-spinners";
const FeeCollectionRecordsTable = ({
  startDate,
  endDate,
  filteredValue,
  loading,
  feecollection,
}) => {
  const currentMonth = new Date().getMonth();
  console.log(currentMonth);
  return (
    <div>
      <div className="feeCollectionTable">
        <p className="mt-3">
          {startDate &&
            endDate &&
            `Fee Records from ${moment(startDate).format(
              "YYYY-MM-DD"
            )} to ${moment(endDate).format("YYYY-MM-DD")}`}
        </p>
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-fees-center">
            <>
              <BounceLoader size={50} color="blue" />
            </>
          </div>
        ) : (
          <div className="d-flex justify-content-center studentsTable">
            {feecollection?.length > 0 && (
              <div className="w-100 card">
                <div className="table-container">
                  <div className="table-responsive w-100">
                    <table>
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Fee Month</th>
                          <th>Paid Amount</th>
                          <th>Payment Status</th>
                          <th>Pay Time</th>
                          <th>Total Amount Due</th>
                          <th>Previous Due</th>

                          <th>Collector Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feecollection?.map((fee, index) => (
                          <tr
                            key={fee?.student_id}
                            className={`${index % 2 === 0 ? "even" : "odd"}`}
                          >
                            <td>{fee?.student_id}</td>
                            <td>{fee?.fee_month}</td>
                            <td>{fee?.paid_amount}</td>
                            <td>
                              <p
                                className={`${
                                  fee?.payment_status == "PARTIAL PAID"
                                    ? "partialPaid"
                                    : fee?.payment_status == "PAID"
                                    ? "paid"
                                    : fee?.payment_status == "ADVANCE PAID"
                                    ? "advancePaid"
                                    : "notPaid"
                                }`}
                              >
                                {fee?.payment_status}
                              </p>
                            </td>
                            <td>{moment(fee?.pay_time).format("hh:mm A")}</td>
                            <td>{fee?.total_amount_due}</td>
                            <td>{fee?.previous_due}</td>

                            <td>{fee?.collector_name}</td>
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

export default FeeCollectionRecordsTable;
