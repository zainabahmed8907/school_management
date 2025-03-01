import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/config";
import moment from "moment/moment";
import "./feecollection.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { monthNames } from "../../../../constants";
import FeeCollectionRecordsTable from "../../../../components/reports/fee-collection/feeCollectionRecordsTable";

const FeeCollectionReports = () => {
  const [feecollection, setFeeCollection] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");
  const [loading, setLoading] = useState(false);
  const currentMonth = new Date().getMonth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [displayRecords, setDisplayRecords] = useState(false);

  const [todayReport, setTodayReport] = useState(false);
  const [yesterdayReport, setYesterdayReport] = useState(false);
  const [thisMonthReport, setthisMOnthReport] = useState(false);

  const handleTodayReport = () => {
    setTodayReport(true);
    setYesterdayReport(false);
    setthisMOnthReport(false);
    setStartDate(null);
    setEndDate(null);
  };
  const handleYesterdayReport = () => {
    setYesterdayReport(true);
    setTodayReport(false);
    setthisMOnthReport(false);
    setStartDate(null);
    setEndDate(null);
  };
  const handleThisMonthReport = () => {
    setYesterdayReport(false);
    setTodayReport(false);
    setthisMOnthReport(true);
    setStartDate(null);
    setEndDate(null);
  };

  // const handleFilteredValue = (e) => {
  //   setFilteredValue(e.target.value);
  //   setStartDate(null);
  //   setEndDate(null);
  //   setTimeout(() => {
  //     getFeeCollection();
  //   }, 1000);
  // };

  const getFeeCollection = async () => {
    setLoading(true);
    setDisplayRecords(true);
    try {
      // if (filteredValue.length > 0) {
      //   const response = await axiosInstance.get(
      //     `/reports/paid-fees?timeFrame=${filteredValue}`
      //   );
      //   const data = response.data;
      //   setFeeCollection(data);
      // }
     
      if (todayReport && !yesterdayReport && !thisMonthReport) {
        const response = await axiosInstance.get(
          `/reports/paid-fees?timeFrame=today`
        );
        const data = response.data;
        setFeeCollection(data);
      }
      if (yesterdayReport ) {
        const response = await axiosInstance.get(
          `/reports/paid-fees?timeFrame=yesterday`
        );
        const data = response.data;
        setFeeCollection(data);
      }
      if(thisMonthReport){
        const response = await axiosInstance.get(
          `/reports/paid-fees?timeFrame=thisMonth`
        );
        const data = response.data;
        setFeeCollection(data);
      }
      if (startDate && endDate) {
        const response = await axiosInstance.get(
          `/reports/paid-fees?timeFrame=custom&startDate=${moment(
            startDate
          ).format("yyyy-MM-DD")}&endDate=${moment(endDate).format(
            "yyyy-MM-DD"
          )}`
        );
        const data = response.data;
        setFeeCollection(data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(()=>{
    getFeeCollection();
  },[todayReport, yesterdayReport, thisMonthReport]);

  return (
    <div className="feecollectionreports">
      <p className="tagline">
       
        Press a specific button or enter the custom date values to generate fee records
      </p>

      <button onClick={handleTodayReport} type="button" className="filteredButton">
        Today
      </button>
      <button onClick={handleYesterdayReport} type="button" className="filteredButton">
        Yesterday
      </button>
      <button onClick={handleThisMonthReport} type="button" className="filteredButton">
        This Month
      </button>

      <div className="d-flex align-items-center flex-wrap">
        {/* <select onChange={handleFilteredValue}>
          <option value="" disabled selected hidden>
            Please Choose...
          </option>

          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="thisMonth">{monthNames[currentMonth]}</option>
        </select> */}
        <p className="or">OR</p>
        <DatePicker
          dateFormat="YYYY-MM-dd"
          placeholderText="Start Date"
          className="ms-lg-3 -custom-datepicker"
          value={startDate}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setFilteredValue("");
          }}
        />
        <DatePicker
          dateFormat="YYYY-MM-dd"
          placeholderText="End Date"
          className="ms-lg-3 -custom-datepicker"
          value={endDate}
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setFilteredValue("");
          }}
        />
        <button className="applyBtn" onClick={getFeeCollection}>
          Apply
        </button>
      </div>

      {displayRecords && feecollection.length > 0 ? (
        <FeeCollectionRecordsTable
          loading={loading}
          feecollection={feecollection}
          startDate={startDate}
          endDate={endDate}
          filteredValue={filteredValue}
        />
      ) : (
        displayRecords && (
          <div className="d-flex justify-content-center mt-5">
            <p className="text-align-center" id="noRecords">
              No Records Found
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default FeeCollectionReports;
