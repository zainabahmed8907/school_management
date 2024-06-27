import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Authenticated from "./Authenticated";

export default function UnAuthenticated({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Authenticated isLoggedIn={isLoggedIn} />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}
