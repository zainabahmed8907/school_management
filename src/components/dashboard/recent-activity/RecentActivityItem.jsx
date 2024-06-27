import React from "react";

function RecentActivityItem({ item }) {
  const activityDate = new Date(item?.activity_time);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - activityDate;

  // Convert milliseconds to minutes
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);

  // Convert minutes to hours
  const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);

  // Output the time duration
  let timeDuration = "";
  if (hours > 0) {
    timeDuration += `${hours} hr${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    timeDuration += `${timeDuration ? " and " : ""}${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  }

  return (
    <div className="activity-item d-flex p-1">
         <div class="lollipop ms-1">
              <div class="top-circle"></div>
            </div>
      <div className="activite-label ms-2">{timeDuration}</div>
       <div className="ms-2 fw-bold">-</div>
      <div className="activity-content">{item?.Activity_Type_desc}</div>
    </div>
  );
}

export default RecentActivityItem;
