import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          AG
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/costumer">
                Costumer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/orders">
                Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/quote">
                Quote
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/salesitem">
                SalesItem
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/cutting">
                Cutting
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contactus">
              Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-light" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
