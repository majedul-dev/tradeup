import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./styles.css";
import logo from "../../images/logo.png";

import { FiSettings, FiLogOut } from "react-icons/fi";
import { BsFillFileEarmarkSpreadsheetFill, BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GrDown } from "react-icons/gr";
import { useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import Search from "../Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const closePopupProfile = () => setIsOpen(!isOpen);

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="container navbar_content">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar_logo" />
        </Link>
        <Route render={({ history }) => <Search history={history} />} />
        {/* <Search history={history} /> */}
        <div className="navbar__right">
          {user ? (
            <div className="navbar--auth">
              <div onClick={closePopupProfile}>
                <img
                  src={user.avatar && user.avatar}
                  className="auth--image mr-1"
                  alt="avatar"
                />
                <GrDown />
              </div>
              <ul className={isOpen ? "active" : ""}>
                <Link
                  to={`/profile/${user._id}`}
                  className="auth--modal"
                  onClick={closePopupProfile}
                >
                  <img
                    src={user.avatar && user.avatar}
                    className="auth--image"
                    alt="avatar"
                  />
                  <div>
                    <small>Hello</small>
                    <h3>{user.username}</h3>
                    <Link to={`/profile/${user._id}`}>
                      View and edit profile
                    </Link>
                  </div>
                </Link>

                <Link to={`/profile/${user._id}`}>
                  <li onClick={closePopupProfile}>
                    <BsFillFileEarmarkSpreadsheetFill /> <span>My Ads</span>
                  </li>
                </Link>
                <Link to={`/offers`}>
                  <li onClick={closePopupProfile}>
                    <BsFillFileEarmarkSpreadsheetFill /> <span>Offers</span>
                  </li>
                </Link>
                <Link>
                  <li onClick={closePopupProfile}>
                    <FiSettings /> <span>Setting</span>
                  </li>
                </Link>
                <Link to="/" onClick={logoutHandler}>
                  <li onClick={closePopupProfile}>
                    <FiLogOut /> <span>Logout</span>
                  </li>
                </Link>
              </ul>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="px-3">
                <strong>Login</strong>
              </Link>
            )
          )}

          <button className="navbar__sellbutton">
            <Link to={isAuthenticated ? "/post" : "/login"}>Exchange</Link>
          </button>
          <Link to={isAuthenticated ? "/chat" : "/login"}>
            <BsChat className="chatIcon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
