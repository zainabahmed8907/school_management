import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/config";
import "../card.css";
import Card from "../card/Card";

function Cards() {
  //variable for accessing active students count
  const [activeStudents, setActiveStudents] = useState({});

  //variable for accessing fee stats
  const [feeStats, setFeeStats] = useState([]);

  //variable for accessing fee collection count
  const [feeCollection, setFeeCollection] = useState();

  //variable for account detials
  const [accountDetails, setAccountDeatils] = useState([]);

  //Fetch Student Details
  const getActiveStudents = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/student-stats");
      const data = response.data;
      setActiveStudents({ data });
    } catch (e) {
      console.log(e);
    }
  };

  //fetch fee stats
  const getFeeCollection = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/fee-stats-amount");
      const data = response.data;
      setFeeCollection(data);
    } catch (e) {
      console.log(e);
    }
  };

  //fetch fee collection
  const getFeeStats = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/fee-stats");
      const data = response.data;
      setFeeStats(data);
    } catch (e) {
      console.log(e);
    }
  };

  //fetch accoutn details
  const getAccountDetails = async () => {
    try {
      const response = await axiosInstance.get("/account-details");
      const data = response.data;
      setAccountDeatils(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getActiveStudents();
    getFeeStats();
    getFeeCollection();
    getAccountDetails();
  }, []);

  return (
    <div className="row">
      {/**Students Card */}
      <Card title={"Students"}>
        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2 card-desc">
            Active Students:{" "}
            <span className="ms-2">{activeStudents?.data?.activeStudents}</span>
          </div>
        </div>

        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2  card-desc">
            Absent Students:{" "}
            <span className="ms-2">{activeStudents?.data?.absentStudents}</span>
          </div>
        </div>

        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2  card-desc">
            Present Students:{" "}
            <span className="ms-2">
              {activeStudents?.data?.presentStudents}
            </span>
          </div>
        </div>
      </Card>

      <Card title={"Fee Collection"}>
        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2 card-desc">
            Amount :{" "}
            <span className="ms-2">{feeCollection?.totalPaidAmount}</span>
          </div>
        </div>
      </Card>

      <Card title={"Fee Statistics"}>
        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2 card-desc">
            Advance Paid :{" "}
            <span className="ms-2">{feeStats["ADVANCE PAID"]}</span>
          </div>
        </div>

        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2 card-desc">
            Not Paid : <span className="ms-2">{feeStats["NOT PAID"]}</span>
          </div>
        </div>

        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>

          <div className="ps-2 card-desc">
            Paid : <span className="ms-2">{feeStats["PAID"]}</span>
          </div>
        </div>

        <div className="p-1 ms-2">
          <div class="lollipop">
            <div class="top-circle"></div>
          </div>
          <div className="ps-2 card-desc">
            Partial Paid :{" "}
            <span className="ms-2">{feeStats["PARTIAL PAID"]}</span>
          </div>
        </div>
      </Card>

      <Card title={"Account Details "}>
        {accountDetails?.map((acc, i) => (
          <div key={i} className="p-1 ms-2 ms-2">
            <div class="lollipop">
              <div class="top-circle"></div>
            </div>

            <span className="ps-2 card-desc">
              {" "}
              {acc?.Acct_type_name + " : " + acc?.current_bal}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default Cards;
