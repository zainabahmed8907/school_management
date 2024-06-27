import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import TeacherDashboard from "../pages/teacher-dashboard";
import StudentDashboard from "../pages/student-dashboard";
import Main from "../components/main/Main";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/footer/Footer";
import UnAuthenticated from "./Unauthenticated";

import AddStudent from "../pages/student-management/add-student/index";
import UpdateStudentInfo from "../pages/student-management/update-student-info/index";
import CheckStudentInfo from "../pages/student-management/check-student-info/index";

import CollectFee from "../pages/fee-management/collect-fee/index";

import AddScool from "../components/add-school/AddSchool";
import AddUser from "../components/add-user/AddUser";
import AllSchools from "../components/all-schools/AllSchools";
import CheckFee from "../pages/fee-management/check-fee";
import ModifyFee from "../pages/fee-management/modify-fee";
import EnterExpenses from "../pages/expense-management/enter-expenses";
import GenerateMonthlyFee from "../pages/generate-fee";

import { lazy, useEffect } from "react";
import FeeCollectionReports from "../pages/reports/fee/fee-collection-reports";
import ExpenseReports from "../pages/reports/expense/expense-reports";
const Dashboard = lazy(() => import("../pages/dashboard/index"));
const DailyAccountStatus = lazy(() =>
  import("../pages/expense-management/daily-account-status")
);

export default function Authenticated({ isLoggedIn }) {
  const { data, auth, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authTOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !authTOKEN) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authTOKEN, navigate]);

  //the condition will check if the user has signed-out, it
  //will take the user to "/login" route
  if (!auth || !authTOKEN) {
    return <UnAuthenticated />;
  }

  return (
    <Main>
      <Header />
      <SideBar />

      <Routes>
        {(data?.role == "Admin" ||
          data?.role == "Super-Admin" ||
          data?.role == "Accountant") && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-schools" element={<AllSchools />} />
            <Route path="/add-school" element={<AddScool />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/register-student" element={<AddStudent />} />
            <Route path="/check-student-info" element={<CheckStudentInfo />} />
            <Route
              path="/update-student-info"
              element={<UpdateStudentInfo />}
            />
            <Route path="/collect-fee" element={<CollectFee />} />
            <Route path="/check-fee" element={<CheckFee />} />
            <Route path="/modify-fee" element={<ModifyFee />} />

            <Route path="/enter-expenses" element={<EnterExpenses />} />
            <Route
              path="/daily-account-status"
              element={<DailyAccountStatus />}
            />

            <Route
              path="/generate-monthly-fee"
              element={<GenerateMonthlyFee />}
            />
            <Route path="/check-fee-status" element={<></>} />

            <Route
              path="/fee-collection-reports"
              element={<FeeCollectionReports />}
            />
            <Route path="/expense-reports" element={<ExpenseReports />} />
          </>
        )}

        {data?.role == "Teacher" && (
          <Route path="/teachers" element={<TeacherDashboard />} />
        )}

        {data?.role == "Student" && (
          <Route path="/students" element={<StudentDashboard />} />
        )}

        {(data?.role == "Admin" ||
          data?.role == "Super-Admin" ||
          data?.role == "Accountant") && (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
        {data?.role == "Teacher" && (
          <Route path="/*" element={<Navigate to="/teachers" />} />
        )}
        {data?.role == "Student" && (
          <Route path="/*" element={<Navigate to="/students" />} />
        )}
      </Routes>

      <Footer />
    </Main>
  );
}
