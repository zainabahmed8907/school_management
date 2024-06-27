import React from "react";
import "./dashboard.css";

import Cards from "../../components/dashboard/cards/Cards";
import FeeCollectionChart from "../../components/dashboard/fee-collection/FeeCollectionChart";
import RecentExpenses from "../../components/dashboard/recent-sales/RecentExpenses";

import RecentFees from "../../components/dashboard/recent-fees/RecentFees";

import RecentActivity from "../../components/dashboard/recent-activity/RecentActivity";
import CurrentCLasses from "../../components/dashboard/current-class/CurrentClass";

import { BounceLoader } from "react-spinners";
function Dashboard() {
  return (
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <React.Suspense fallback={null}>
              <Cards />
            </React.Suspense>
            <div className="col-12 h-75">
              <React.Suspense fallback={null}>
                <FeeCollectionChart />
              </React.Suspense>
            </div>
            <div className="col-12">
              <React.Suspense
                fallback={
                  <div>
                    <BounceLoader  className="h-100 w-100 d-flex justify-content-center align-items-center"/>
                  </div>
                }
              >
                <RecentExpenses />
              </React.Suspense>
            </div>
            <div className="col-12">
              <React.Suspense fallback={null}>
                <RecentFees />
              </React.Suspense>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-4">
          <React.Suspense>
            <RecentActivity />
            <CurrentCLasses />
          </React.Suspense>
        </div> */}
      </div>
    </section>
  );
}

export default Dashboard;
