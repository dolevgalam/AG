import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  if(props.status==1){
    return <MuiAlert elevation={6}
    variant="filled" {...props} />;
  } else {
    return null
  }

}

const Navbar = ({ test , alert } ) => {
  useEffect (()=>{
    console.log("EEEEEEEEEEEEEEEEEEEE")
  });
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container fluid">
          <Link style={{ fontSize: "25px" }} className="navbar-brand" href="/">
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
              {/* <li class="nav-item">
						<span class="badge badge-pill badge-danger" style={{float:'right',marginBottom:'-20px'}}>1</span>
						<a class="nav-link" href="messages">Dashboard <span class="sr-only">(current)</span></a>
					</li> */}
                {/* {localStorage.token != null ? <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    Dashboard
              </NavLink>
                </li> : null} */}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/costumer">
                  Costumer
            </NavLink>
              </li> : null}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/orders">
                  Orders
            </NavLink>
              </li> : null}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/pricequote">
                  Quote
            </NavLink>
              </li> : null}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/salesitem">
                  SalesItem
            </NavLink>
              </li> : null}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/cutting">
                  Cutting
            </NavLink>
              </li> : null}
              {localStorage.token != null ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/employee">
                  Employees
            </NavLink>
              </li> : null}
              {"1" == "1" ? <li className="nav-item">
                <NavLink className="nav-link" exact to="/contactus">
                  Contact Us
            </NavLink>
              </li> : null}
            </ul>
          </div>
          <div className="mr-2">
          <Link className="btn btn-outline-light mr-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light ml-2" to="/register">Logout</Link>
          </div>
        </div>
      </nav>
      <div>
        <Alert align="center" status= {alert.status} severity={alert.severity}>{alert.message}</Alert>
      </div>
    </div>

  );

  // // if customer
  // if (test==2) {
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
