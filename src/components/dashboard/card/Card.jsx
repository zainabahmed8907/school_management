import React from "react";
import "../card.css";

function Card({ title, children }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card info-card sales-card h-75 pb-4">
        <div className="card-body">
          <p className="card-title title">{title}</p>

          <div className="activity" style={{marginTop:-20}}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
