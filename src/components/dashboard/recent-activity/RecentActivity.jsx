import React, { useState, useEffect } from "react";
import "./recentActivity.css";
import RecentActivityItem from "./RecentActivityItem";
import axiosInstance from "../../../api/config";

function RecentActivity() {
  const [items, setItems] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "/recent_activity?user_id=1&rows=5"
      );
      setItems(response.data);
    } catch (e) {
      console.log (e);
    }
  };

  // Sample month names
  const monthNames = [
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

  // Filter data based on selected month
  const handleMonthChange = (e) => {
    const selectedMonthIndex = e.target.value;
    setSelectedMonth(selectedMonthIndex);
    const filtered = items?.filter((item) => {
      const payDate = new Date(item?.activity_time);
      return payDate.getMonth() === selectedMonthIndex;
    });
    setFilteredMonths(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const uniqueMonths = Array.from(
      new Set(items?.map((item) => new Date(item.activity_time).getMonth()))
    );

    setFilteredMonths(uniqueMonths);
  }, [items]);

  useEffect(() => {
    const filteredRecord = items?.filter(
      (data) => new Date(data?.activity_time).getMonth() == selectedMonth
    );  

    setFilteredData(filteredRecord);
  }, [selectedMonth, items]);

  return (
    <div className="card activityCard">
      {/* <CardFilter filterChange={handleFilterChange} /> */}

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="title">Recent Activity</h5>
          </div>
          <div>
            <select
              value={monthNames[selectedMonth]}
              onChange={handleMonthChange}
              className="select"
            >
              {filteredMonths?.map((month, index) => (
                <option key={index+1} value={month}>
                  {monthNames[month]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="activity">
          {items && items?.length > 0
            ? items?.map((item) => (
                <RecentActivityItem key={item?.id} item={item} />
              ))
            : filteredData?.length > 0 &&
              filteredData?.map((item) => (
                <RecentActivityItem key={item?.id} item={item} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
