import React from "react";
import "./main.css";
import PageTitle from "../page-title/PageTitle";


function Main({ children }) {

  return (
    <main id="main" className="main ">
      <PageTitle />

      {children}
    </main>
  );
}

export default Main;
