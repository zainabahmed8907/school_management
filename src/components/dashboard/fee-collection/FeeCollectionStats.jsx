import React, { useState } from "react";
import Chart from "react-apexcharts";
import axiosInstance from "../../../api/config";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./feecollection.css";

function FeeCollectionStats() {
  const [barData, setBarData] = useState([]);
  const [filteredMonths, setFilteredMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState([]);
  const [paidRecordsCounts, setPaidRecordsCounts] = useState([]);
  const [dates, setDates] = useState([]);
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

  //fetch the data from an API
  const getStatsData = async () => {
    try {
      const resposne = await axiosInstance.get("/monthly-fee-coll-stats");
      const data = resposne.data;
      setBarData(data);
    } catch (e) {
      console.log(e);
    }
  };

  // Configuration for the bar chart
  const options = {
    chart: {
      type: "bar",
      barHeight: 200,
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        try {
          const date = dates[dataPointIndex];
          const paidAmount = totalPaidAmount[dataPointIndex];
          const paidCount = paidRecordsCounts[dataPointIndex];
          const month = date.toLocaleString("default", { month: "long" });
          const day = date.getDate();
          const paidAmountStyle = "color: #012970;"; // Change color as needed
          const monthStyle = "color:black;font-size:1rem";
          const paidCountStyle = "color:#3366FF";

          return `<div className="tooltip"><span style="${monthStyle}">${month} ${day}<span><br/><span style="${paidCountStyle}">Paid Count: ${paidCount}</span><br/>
          <span style="${paidAmountStyle}">
          Paid Amount: ${paidAmount}<br/>
          </span></div>`;
        } catch (error) {
          console.error("Error rendering tooltip:", error);
          return ""; // Return empty string if there's an error
        }
      },
      shared: false,
      intersect: true,
      enabled: true,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: "top",
        offsetX: 0,
        offsetY: 0,
      },
    },

    plotOptions: {
      bar: {
        dataLabels: {
          position: "bottom",
          style: {
            height: "20px", // Decrease the font size to decrease the height of the bars
          },
        },
      },
    },
    dataLabels: {
      offsetY: 20,
      offsetX: -2,
      zIndex: 10,
      style: {
        colors: ["transparent", "black"],
      },
    },
    grid: {
      show: false,
    },

    xaxis: {
      categories: categories,
      title: {
        text: "Pay Days",
      },
    },
    yaxis: [
      {
        title: {
          text: "Total Paid Amount",
        },
        tickAmount: 5,
        min: 1000,
        max:
          barData?.length > 0 &&
          Math.max(
            barData.filter((b) => b?.monthlyFeeCollectionStats?.totalPaidAmount)
          ),
      },
      {
        opposite: true,
        tickAmount: 5,
        max: 10,
        min: 1,
        labels: {
          show: true, // Hide the labels on this y-axis
        },
      },
    ],
    colors: ["#012970", "transparent"],
  };

  // Series data for the bar chart
  const series = [
    {
      name: "Total Paid Amount",
      data: totalPaidAmount,

      dataLabels: {
        enabled: false,
      },
    },
    {
      name: "Paid Records Count",
      data: paidRecordsCounts,
      yAxisIndex: 1,
    },
  ];

  // Filter data based on selected month
  const handleMonthChange = (e) => {
    // const selectedMonthIndex = e.target.value;
    // setSelectedMonth(selectedMonthIndex);
    // const filtered = barData?.monthlyFeeCollectionStats?.filter((item) => {
    //   const payDate = new Date(item?.payDate);
    //   return payDate.getMonth() === selectedMonthIndex;
    // });
    const selectedMonthIndex = e.target.value;
    setSelectedMonth(selectedMonthIndex);
  };

  useEffect(() => {
    getStatsData();
  }, []);

  useEffect(() => {
    const uniqueMonths = barData?.monthlyFeeCollectionStats?.map((item) =>
      new Date(item.payDate).getMonth()
    );

    console.log(...new Set(uniqueMonths));
    setFilteredMonths(...new Set(uniqueMonths));
  }, [barData]);

  // console.log(filteredMonths)
  useEffect(() => {
    const filteredRecord = barData?.monthlyFeeCollectionStats?.filter(
      (data) => new Date(data?.payDate).getMonth() == selectedMonth
    );

    setFilteredData(filteredRecord);
  }, [selectedMonth, barData]);

  useEffect(() => {
    const newData =
      filteredData?.length > 0
        ? filteredData
        : barData?.monthlyFeeCollectionStats || [];
    const newCategories = newData.map((_, index) => index + 1);
    const newTotalPaidAmount = newData.map((item) =>
      parseInt(item.totalPaidAmount)
    );
    const newPaidRecordsCounts = newData.map((item) => item.paidRecordsCount);
    const newDates = newData.map((item) => new Date(item.payDate));
    if (newCategories?.length == 1) {
      setCategories(Array.from({ length: 10 }, (_, i) => `${i + 1}`));
    }
    if (newCategories?.length > 1) {
      setCategories(newCategories);
    }
    setTotalPaidAmount(newTotalPaidAmount);
    setPaidRecordsCounts(newPaidRecordsCounts);
    setDates(newDates);
  }, [filteredData, barData]);

  return (
    <div>
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="month_seelct"
      >
        <option key={""} value={filteredMonths}>
          {monthNames[filteredMonths]}
        </option>
      </select>

      {barData?.monthlyFeeCollectionStats?.length > 0 && (
        <Chart options={options} series={series} type="bar" height={550} />
      )}
    </div>
  );
}

export default FeeCollectionStats;
