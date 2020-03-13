import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";

export const Navbar = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();

    const handleLogout = () => {
      dataStore.handleLogoutState();
      history.push("/");
    };

    let title = process.env.REACT_APP_API_NAME || "e-com2";

    return (
      <nav>
        <div className="nav-wrapper blue-grey">
          <div className="container">
            <Link to="/" className="brand-logo">
              {title}
            </Link>
            <ul className="right">
              <li>
                {" "}
                {dataStore.isAuthenticated ? (
                  <span>Hi there {dataStore.currentUser.firstName} </span>
                ) : null}{" "}
              </li>
              <li>
                {" "}
                {dataStore.isAuthenticated ? (
                  <span onClick={handleLogout}>logout</span>
                ) : (
                  <Link to="/login">login</Link>
                )}{" "}
              </li>
              <li>
                <Link to="/basket">
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  })
);
