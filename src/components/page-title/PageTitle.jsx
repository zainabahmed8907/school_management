import React from "react";
import "./pageTitle.css";
import { useLocation } from "react-router-dom";
function PageTitle() {
  const router = useLocation();

  let pathName = "";

  if (router?.pathname?.substring(1)?.includes("-")) {
    const route = router?.pathname?.substring(1)?.split("-");
    pathName =  
      route[0]?.charAt(0)?.toUpperCase() +""+route[0]?.substring(1)+
      " " +
      route[1]?.charAt(0)?.toUpperCase()+""+route[1]?.substring(1);
  }
  else{
    pathName=router?.pathname?.substring(1).charAt(0).toUpperCase() +
    "" +
    router?.pathname?.substring(2)
  }

  return (
    <div className="pagetitle">
      <h1>
        {pathName}
      </h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
