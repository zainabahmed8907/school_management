import React from "react";

function RecentFeeItem({ item, index }) {
  return (
    <tr className={`${index % 2 == 0 ? "even" : "odd"}`}>
      <td>{item?.student_id}</td>
      <td>{item?.Paid_amount}</td>
      <td>{item?.Pay_time}</td>
      <td>{item?.fee_month}</td>
      <td>
        <p
          className={`${
            item?.payment_status == "PARTIAL PAID"
              ? "partialPaid"
              : item?.payment_status == "PAID"
              ? "paid"
              : item?.payment_status == "ADVANCE PAID"
              ? "advancePaid"
              : "notPaid"
          }`}
        >
          {item?.payment_status}
        </p>
      </td>
      <td>{item?.total_amount_due}</td>
    </tr>
  );
}

export default RecentFeeItem;
