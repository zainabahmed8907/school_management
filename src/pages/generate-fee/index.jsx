import { useEffect, useState } from "react";
import axiosInstance from "../../api/config";
import "jspdf-autotable";
import GenerateFeeChallanPdf from "../../components/generate-fee/generate-monthly-fee/GenerateFeeChallanPdf";
import BounceLoader from "react-spinners/BounceLoader";
import "./generatemonthlyfee.css";

const GenerateMonthlyFee = () => {
  const [feeData, setFeeData] = useState([]);
  const [loadFeeChallan, setLoadFeeCHallanPdf] = useState(false);
  const [accountStatus, setAccountStatus] = useState();

  const getFeeData = async () => {
    setLoadFeeCHallanPdf(true);
    try {
      const response = await axiosInstance.get("/get-fee-data");
      const data = response.data;
      setFeeData(data);
      console.log(data)
    } catch (e) {
      console.log("error");
    }
    setLoadFeeCHallanPdf(false);
  };

  //get account status
  const getAccountStatus = async () => {
    try {
      const response = await axiosInstance.get("/account-details");
      const data = response.data;
      setAccountStatus(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFeeData();
    getAccountStatus();
  }, []);
  useEffect(() => {
    const groupedFeeData = [];
    for (let i = 0; i < feeData.length; i += 2) {
      const pair = [feeData[i]];
      if (feeData[i + 1]) {
        pair.push(feeData[i + 1]);
      }
      groupedFeeData.push(pair);
    }
    console.log(
      groupedFeeData.map((data, i) =>{
        for(let i=0;i<data.length;i++){
          console.log(data[i]);
        }
      })
    );
  }, [feeData]);

  return (
    <div className="generate-monthly-fee">
      <div className="account_status">
        <p className="heading">Account Status</p>

        <div className="card w-50 w-sm-100 p-3 accountDetailCard mt-4 mb-5">
          <div className="p-3 card-inner rounded">
            <div className="card-details">
              <div className="d-flex justify-content-between heading">
                <p className="fw-bold">Account Name</p>
                <p className="fw-bold">Details</p>
              </div>

              {accountStatus?.map((account) => (
                <div className="d-flex justify-content-between details">
                  <p>{account?.Acct_type_name}</p>
                  <p>{account?.current_bal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="form-fields">
        <form>
          <input placeholder="Fee Month" />
          <input placeholder="Annual_Charges" type="number" />
          <input placeholder="Misc Charges" type="number" />
          <input placeholder="Stationary Charges" type="number" />

          <textarea
            placeholder="Misc Charges Desc"
            type="number"
            rows={2}
            cols={90}
          />

          <button className="ms-5 mt-4" id="fee-btn">
            Generate Fee
          </button>
        </form>
      </div>
      {loadFeeChallan ? (
        <div className="d-flex justify-content-center">
          <BounceLoader color="#4154f1" />
        </div>
      ) : (
        <div className="mt-5">
          <GenerateFeeChallanPdf feeData={feeData} />
        </div>
      )}
    </div>
  );
};

export default GenerateMonthlyFee;
