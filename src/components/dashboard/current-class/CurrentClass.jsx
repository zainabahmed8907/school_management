import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/config";
import "./currentclass.css";
import CurrentClassTable from "./CurrentClassTable";

function CurrentCLasses() {
  const [items, setItems] = useState([]);

  const fetchDataa = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/current-classes");
      const data = response.data;
      setItems(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDataa();
  }, []);

  return (
    <div className="card classesCard">
      <div className="card-body pb-0">
        <h5 className="card-title title">Current Classes</h5>
        <CurrentClassTable items={items} />
      </div>
    </div>
  );
}

export default CurrentCLasses;
