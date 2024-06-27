import React from "react";
import "./feecollection.css";
import FeeCollectionStats from "./FeeCollectionStats";

function FeeCollectionChart() {
  return (
    <div className="card stats-card">
      {/* <CardFilter filterChange={handleFilterChange} /> */}
      <div className="card-body">
        <h5 className="card-title feeCollectionTitle">
          Fee Collection Statistics
        </h5>
        <FeeCollectionStats />
      </div>
    </div>
  );
}

export default FeeCollectionChart;
