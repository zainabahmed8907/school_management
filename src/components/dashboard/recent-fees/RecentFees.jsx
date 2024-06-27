import React, { useState, useEffect } from "react";
import RecentFeeItem from "./RecentFeeItem";
import "./recentfee.css";
import axiosInstance from "../../../api/config";

function RecentFees() {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/recent-fees");
      const data = response.data;
      setItems(data);
      //save original items for filtering the records later
      setOriginalItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonthIndex = e.target.value;
    setSelectedMonth(selectedMonthIndex);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const uniqueMonths = Array.from(new Set(items.map(item => new Date(item.Pay_time).getMonth())));
    setFilteredMonths(uniqueMonths);
  }, [items]);

  useEffect(() => {
    //filter the records  on the basis of month
    const filteredRecord = originalItems.filter(data => new Date(data.Pay_time).getMonth() === Number(selectedMonth));
    setFilteredData(filteredRecord);
  }, [selectedMonth, originalItems]);

  return (
    <div className="card top-selling overflow-auto">
      <div className="card-body pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="title">Recent Fees</h5>
          </div>
          <div className="mt-4">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="select"
            >
              {filteredMonths.map((month, index) => (
                <option key={index} value={month}>{monthNames[month]}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="feeTable table-borderless mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th scope="col">Amount Paid</th>
              <th scope="col">Time</th>
              <th scope="col">Month</th>
              <th scope="col">Status</th>
              <th scope="col">Amount Due</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? 
              filteredData.map((item, index) => (
                <RecentFeeItem key={item.student_id} item={item} index={index} />
              )) :
              items.map((item, index) => (
                <RecentFeeItem key={item.student_id} item={item} index={index} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentFees;
