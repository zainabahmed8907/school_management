import React, { useEffect, useState } from "react";
import "./all-schools.css";
import axiosInstance from "../../api/config";

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSchools = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/schools");
      const data = response.data;
      setSchools(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);
  return (
    <div className="container-fluid pb-5">
      {loading ? (
        <div className="container">
          <div className="d-flex vh-100 align-items-center">
            <div className="col text-center">
              <div
                className=" m-auto spinner-grow text-primary"
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tablever1 m-b-110">
          <div className="table-responsive table-wrapper">
            <table>
              <thead>
                <tr className="row1 head">
                  <th className="cell1 column2 th-cell">Name</th>
                  <th className="cell1 column3 th-cell">Address</th>
                  <th className="cell1 column4 th-cell">Owner</th>
                </tr>
              </thead>

              <tbody>
                {schools?.map((school, i) => {
                  return (
                    <tr
                      className={`row1 ${i % 2 === 0 ? "even" : "odd"}`}
                      key={school?.ID}
                    >
                      <td className="cell1 column2 td-cell">{school?.Name}</td>
                      <td className="cell1 column3 td-cell">
                        {school?.Address}
                      </td>
                      <td className="cell1 column4 td-cell">{school?.Owner}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSchools;
