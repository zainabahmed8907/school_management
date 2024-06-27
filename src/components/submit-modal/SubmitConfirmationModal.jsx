import "./submitfeemodal.css";

const SubmitConfrimationModal = ({ handleFeeSubmit, message }) => {
  return (
    <div
      className="modal fade"
      id="submitFeeModal"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="submitFeeModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" id="modalDialogHeader">
            <h5 className="modal-title" id="submitFeeModal">
              Please Confirm
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="modal-body">
          {message}
          </div>
          <div className="modal-footer d-flex">
          <div>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="submitBtn"
                onClick={handleFeeSubmit}
              >
                Yes, Continue to Submit
              </button>
            </div>
            <div>
              {" "}
              <button
                type="button"
                data-bs-dismiss="modal"
                className="cancelBtn"
              >
                No, Cancel
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfrimationModal;
