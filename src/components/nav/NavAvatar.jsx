import React from "react";
import profileImg from "../../images/user.jpg"
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

function NavAvatar() {
  const dispatch = useDispatch();
  const {data } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(signOut());
    navigate("/login");
      
  };
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={profileImg} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {data?.user}
        </span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{data?.user}</h6>
          <span>{data?.role}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="pages-faq.html"
          >
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li
          onClick={logOut}
          className="dropdown-item d-flex align-items-center cursor-pointer"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Sign Out</span>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
