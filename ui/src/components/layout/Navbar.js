import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ test }) => {
  const b = { test }
  console.log(b.test)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container fluid">
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
                {localStorage.getItem('mail')}
              </NavLink>
            </li>
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Dashboard
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/costumer">
                Costumer
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/orders">
              Orders
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/quote">
              Quote
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/salesitem">
              SalesItem
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/cutting">
              Cutting
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/contactus">
              Contact Us
            </NavLink>
            </li> : null}
            {b.test == '2' ? <li className="nav-item">
              <NavLink className="nav-link" exact to="/employee">
              Employees
            </NavLink>
            </li> : null}
          </ul>
        </div>
        <Link className="btn btn-outline-light" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
      </div>
    </nav>

  );

  // // if customer
  // if (b.test==2) {
  //   return (
  //     <h1> a </h1>
  //   );
  //   // if employee  
  // } else {
  //   return (
  //     <h1> b </h1>
  //   );
  // }
};

export default Navbar;
