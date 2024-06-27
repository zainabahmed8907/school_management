import React, { useState, useEffect } from "react";
import "./recentSales.css";
import axiosInstance from "../../../api/config";
import RecentExpenseTable from "./RecentExpenseTable";
function RecentExpenses() {
  const [items, setItems] = useState([]);
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/recent-expenses");
      const data = response.data;
      setItems(data);
    } catch (e) {
      console.log(e);
    }
  };

  // Filter data based on selected month
  const handleMonthChange = (e) => {
    const selectedMonthIndex = e.target.value;
    setSelectedMonth(selectedMonthIndex);
    const filtered = items?.filter((item) => {
      const payDate = new Date(item?.exp_time);
      return payDate.getMonth() === selectedMonthIndex;
    });
    setFilteredMonths(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const uniqueMonths = Array.from(
      new Set(items?.map((item) => new Date(item?.exp_time).getMonth()))
    );

    setFilteredMonths(uniqueMonths);
  }, [items]);

  useEffect(() => {
    const filteredRecord = items?.filter(
      (data) => new Date(data?.exp_time).getMonth() == selectedMonth
    );

    setFilteredData(filteredRecord);
  }, [selectedMonth, items]);

  return (
    <div className="card recent-sales overflow-auto">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="title">Recent Expenses</h5>
          </div>
          <div>
            <select
              value={monthNames[selectedMonth]}
              onChange={handleMonthChange}
              className="select"
            >
              {filteredMonths?.map((month, index) => (
                <option key={index} value={month}>
                  {monthNames[month]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <RecentExpenseTable items={filteredData?.length ? filteredData : items} />
      </div>
    </div>
  );
}

export default RecentExpenses;
