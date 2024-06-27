import React from "react";

function RecentExpenseTable({ items }) {
  return (
    <table className="datatable">
      <thead className="table-light">
        <tr >
          <th scope="col">Id</th>
          <th scope="col">Expense Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Type</th>
          <th scope="col">INV_Num</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.length > 0 &&
          items.map((item, i) => (
            <tr key={item.exp_id} className={`${i % 2 === 0 ? "even" : "odd"}`}>
              <td>{item?.exp_id}</td>
              <td>{item?.exp_acct_name}</td>
              <td>{item?.amount}</td>
              <td>{item?.exp_type}</td>
              <td>{item?.inv_num}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentExpenseTable;
