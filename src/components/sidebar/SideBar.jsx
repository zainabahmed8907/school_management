import React from "react";
import "./sideBar.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "../logo/Logo";

function SideBar() {
  const location = useLocation();

  const { data } = useSelector((state) => state.auth);

  const AdminsAccountantMenus = () => {
    return (
      <>
        {/**Student management items */}
        <li className="nav-item">
          <a
            data-bs-target="#students-nav"
            data-bs-toggle="collapse"
            className={`nav-link collapsed ${
              location.pathname === "/register-student" ||
              location.pathname === "/check-student-info" ||
              location.pathname === "/update-student-info"
                ? "active"
                : ""
            }`}
            href="/"
          >
            <i className="bi bi-kanban"></i>
            <span>Students Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="students-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <Link
              to="/register-student"
              className={`${
                location.pathname === "/register-student" ? "active" : ""
              }`}
            >
              <i className="bi bi-circle"></i>
              <span>Register New Student</span>
            </Link>
            <li>
              <Link
                to="/check-student-info"
                className={`${
                  location.pathname === "/check-student-info" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Check Student Information</span>
              </Link>
            </li>
            <li>
              <Link
                to="/update-student-info"
                className={`${
                  location.pathname === "/update-student-info" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Update Student Information</span>
              </Link>
            </li>
          </ul>
        </li>

        {/**Fee Items */}
        <li className="nav-item">
          <a
            data-bs-target="#fee-nav"
            data-bs-toggle="collapse"
            href="/"
            className={`nav-link collapsed ${
              location.pathname === "/collect-fee" ||
              location.pathname === "/check-fee" ||
              location.pathname === "/modify-fee"
                ? "active"
                : ""
            }`}
          >
            <i className="bi bi-wallet2"></i>
            <span>Fee</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="fee-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <Link
              to="/collect-fee"
              className={`${
                location.pathname === "/collect-fee" ? "active" : ""
              }`}
            >
              <i className="bi bi-circle"></i>
              <span>Collect Fee</span>
            </Link>
            <Link
              to="/check-fee"
              className={`${
                location.pathname === "/check-fee" ? "active" : ""
              }`}
            >
              <i className="bi bi-circle"></i>
              <span>Check Fee</span>
            </Link>

            <Link
              to="/modify-fee"
              className={`${
                location.pathname === "/modify-fee" ? "active" : ""
              }`}
            >
              <i className="bi bi-circle"></i>
              <span>Modify Fee</span>
            </Link>
          </ul>
        </li>

        {/**Expenses Items */}
        <li className="nav-item">
          <a
            data-bs-target="#expense-nav"
            data-bs-toggle="collapse"
            href="/"
            className={`nav-link collapsed ${
              location.pathname === "/enter-expenses" ||
              location.pathname === "/reverse-expense"
                ? "active"
                : ""
            }`}
          >
            <i className="bi bi-currency-exchange"></i>
            <span>Expenses</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="expense-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link
                to="/enter-expenses"
                className={`${
                  location.pathname === "/enter-expenses" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Enter Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/daily-account-status"
                className={`${
                  location.pathname === "/daily-account-status" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Daily Account Status</span>
              </Link>
            </li>
          </ul>
        </li>

        {/**Reports items */}
        <li className="nav-item">
          <a
            href="#reports-menu"
            className="nav-link collapsed list-group-item"
            data-bs-toggle="collapse"
            data-bs-parent="#main-menu"
          >
            <i className="bi bi-file-earmark-text"></i>
            <span>Reports</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <ul className="collapse list-group-level1" id="reports-menu">
            <li>
              <a
                href="#reports-sub-menu1"
                className="nav-link collapsed mt-1 list-group-item"
                data-bs-toggle="collapse"
                data-bs-parent="#reports-menu"
              >
                <i className="bi bi-file-earmark-text"></i>
                <span>Student Reports</span>
                <i
                  className="bi bi-chevron-down ms-auto"
                  style={{ fontSize: 12 }}
                ></i>
              </a>

              <ul
                className="nav-content collapse list-group-level2"
                id="reports-sub-menu1"
              >
                <li data-bs-parent="reports-sub-menu1">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Students by Class</span>
                  </a>
                </li>

                <li data-bs-parent="reports-sub-menu1">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Students by ID</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu1">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Students by Status</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu1">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Students by Session</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="collapse list-group-level1" id="reports-menu">
            <li>
              <a
                href="#reports-sub-menu2"
                data-bs-toggle="collapse"
                data-bs-parent="#reports-menu"
                className={`nav-link collapsed ${
                  location.pathname === "/fee-collection-reports"
                    ? "active"
                    : ""
                }`}
              >
                <i className="bi bi-file-earmark-text"></i>
                <span>Fee Reports</span>
                <i
                  className="bi bi-chevron-down ms-auto"
                  style={{ fontSize: 12 }}
                ></i>
              </a>
              <ul
                className="nav-content collapse list-group-level2"
                id="reports-sub-menu2"
              >
                <li data-bs-parent="reports-sub-menu2">
                  <Link
                    to="/fee-collection-reports"
                    className={`${
                      location.pathname === "/fee-collection-reports"
                        ? "active"
                        : ""
                    }`}
                  >
                    <i className="bi bi-circle"></i>
                    <span>Fee Collection Reports </span>
                  </Link>
                </li>
                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Montly Fee Collection</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Un-Paid this Month</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Paid/Partial Paid this Month</span>
                  </a>
                </li>

                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span> Paid this Month</span>
                  </a>
                </li>

                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Partial Paid this Month</span>
                  </a>
                </li>

                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Advance Paid this Month </span>
                  </a>
                </li>

                <li data-bs-parent="reports-sub-menu2">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>More that 2 month n-paid </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="collapse list-group-level1" id="reports-menu">
            <li>
              <a
                href="#reports-sub-menu3"
                data-bs-toggle="collapse"
                data-bs-parent="#reports-menu"
                className={`nav-link collapsed  mt-1 list-group-item ${
                  location.pathname === "/expense-reports" ? "active" : ""
                }`}
              >
                <i className="bi bi-file-earmark-text"></i>

                <span>Expense Reports</span>
                <i
                  className="bi bi-chevron-down ms-auto"
                  style={{ fontSize: 12 }}
                ></i>
              </a>
              <ul
                className="nav-content collapse list-group-level2"
                id="reports-sub-menu3"
              >
                <li
                  data-bs-parent="reports-sub-menu3"
                  className={`${
                    location.pathname === "/expense-reports" ? "active" : ""
                  }`}
                >
                  <Link to="/expense-reports">
                    <i className="bi bi-circle"></i>
                    <span>Expenses Report</span>
                  </Link>
                </li>
                <li data-bs-parent="reports-sub-menu3">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Monthly Expense</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu3">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Expense By Date</span>
                  </a>
                </li>
                <li data-bs-parent="reports-sub-menu3">
                  <a href="/">
                    <i className="bi bi-circle"></i>
                    <span>Expense by Type</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/**Generate Fee */}
        <li className="nav-item">
          <a
            data-bs-target="#generateFee-nav"
            data-bs-toggle="collapse"
            href="/"
            className={`nav-link collapsed ${
              location.pathname === "/check-fee-status" ||
              location.pathname === "/generate-monthly-fee"
                ? "active"
                : ""
            }`}
          >
            <i className="bi bi-bar-chart"></i>
            <span>Generate Fee</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="generateFee-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/check-fee-status">
                <i className="bi bi-circle"></i>
                <span>Check Fees Status</span>
              </Link>
            </li>
            <li>
              <Link to="/generate-monthly-fee">
                <i className="bi bi-circle"></i>
                <span>Generate Monthly Fee</span>
              </Link>
            </li>
          </ul>
        </li>
      </>
    );
  };

  const AdminsMenuItems = () => {
    return (
      <>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#schoolConfig-nav"
            data-bs-toggle="collapse"
            href="/"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>School Configuration</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="schoolConfig-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>School Info Management</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Classes Management</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Staff Management</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Expense Types Management</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Session Management</span>
              </a>
            </li>
          </ul>
        </li>
      </>
    );
  };

  const AdminandTeachers = () => {
    return (
      <>
        <li className="nav-item">
          <a
            className={`nav-link collapsed ${
              location.pathname === "/teachers" ? "active" : ""
            }`}
            data-bs-target="#teachers-nav"
            data-bs-toggle="collapse"
            href="/teachers"
          >
            <i className="bi bi-book"></i>
            <span>Teachers</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="teachers-nav" className="nav-content collapse ">
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Teacher Page-1</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Teacher Page-2</span>
              </a>
            </li>
          </ul>
        </li>
      </>
    );
  };

  const SuperAdminNav = () => {
    return (
      <>
        <li className="nav-item">
          <a
            className={`nav-link collapsed ${
              location.pathname === "/all-schools" ||
              location.pathname === "/add-school" ||
              location.pathname === "/add-user"
                ? "active"
                : ""
            }`}
            data-bs-target="#superAdmin-nav"
            data-bs-toggle="collapse"
            href="/"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Admin Configurations</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="superAdmin-nav" className="nav-content collapse ">
            <li>
              <Link
                to="/all-schools"
                className={`${
                  location.pathname === "/all-schools" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>All Schools</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-school"
                className={`${
                  location.pathname === "/add-school" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Add School</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-user"
                className={`${
                  location.pathname === "/add-user" ? "active" : ""
                }`}
              >
                <i className="bi bi-circle"></i>
                <span>Add User</span>
              </Link>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Add Fee Cycle</span>
              </a>
            </li>
          </ul>
        </li>
      </>
    );
  };

  const AdminandStudents = () => {
    return (
      <>
        <li className="nav-item">
          <a
            className={`nav-link collapsed ${
              location.pathname === "/students" ? "active" : ""
            }`}
            data-bs-target="#student-nav"
            data-bs-toggle="collapse"
            href="/"
          >
            <i className="bi bi-backpack"></i>
            <span>Students</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="student-nav" className="nav-content collapse ">
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Students Page-1</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bi bi-circle"></i>
                <span>Students Page-2</span>
              </a>
            </li>
          </ul>
        </li>
      </>
    );
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {(data?.role == "Admin" ||
          data?.role == "Accountant" ||
          data?.role == "Super-Admin") && (
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`nav-link collapsed ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
              href="/"
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        {(data?.role == "Admin" ||
          data?.role == "Accountant" ||
          data?.role == "Super-Admin") && <AdminsAccountantMenus />}

        {(data?.role == "Admin" || data?.role == "Super-Admin") && (
          <AdminsMenuItems />
        )}

        {(data?.role == "Admin" ||
          data?.role == "Super-Admin" ||
          data?.role == "Teacher") && <AdminandTeachers />}

        {(data?.role == "Admin" ||
          data?.role == "Super-Admin" ||
          data?.role == "Student") && <AdminandStudents />}

        {data?.role == "Super-Admin" && <SuperAdminNav />}
      </ul>
    </aside>
  );
}

export default SideBar;
