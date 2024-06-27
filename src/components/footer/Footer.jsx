import React from "react";
import "./footer.css";

function Footer() {
  return (
    <>

      <footer id="footer" className="footer cw-100  m-auto ">
      <div className="col-lg-12 border mb-4"></div>

        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>DStudio Technology</span>
          </strong> 
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="#">David</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
