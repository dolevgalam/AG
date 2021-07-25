import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router, Route, Switch, withRouter
} from "react-router-dom";
import Cutting from "./components/pages/Cutting";
import Orders from "./components/pages/Orders";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Costumer from "./components/pages/Costumer";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
//import User from "./components/users/User";
import SalesItem from "./components/pages/SalesItem";
import SalesItem_View from "./components/SalesItem/SalesItem";
import EditSalesItem from "./components/SalesItem/EditSalesItem";
import AddSalesItem from "./components/SalesItem/AddSalesItem";
import ContactUs from "./components/pages/ContactUs";
import Employee from "./components/pages/Employee";
import Employee_View from "./components/employee/employee";
import AddEmployee from "./components/employee/AddEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import Pricequote from "./components/pages/pricequote";
import AddPricequote from "./components/pricequote/AddPricequote";
import EditPricequote from "./components/pricequote/EditPricequote";
import ViewPricequote from "./components/pricequote/ViewPricequote";


function App() {
  const [test, setTest] = useState('1');
  const [alert, setAlert] = useState({severity:"",message:"",status:0});

  return (

    <Router>
      <div className="App">
        <Navbar test={test} alert={alert}/>
        <Switch >
          <Route exact path="/" render={() => <div><Dashboard setTest={setTest}/></div>} />
          <Route exact path="/cutting" component={Cutting} />
          <Route exact path="/costumer" component={Costumer} />
          <Route exact path="/orders" component={Orders} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/login" render={() => <div><Login setAlert={setAlert}/></div>} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          {/* <Route exact path="/users/:id" component={User} /> */}
          <Route exact path="/salesitem" component={SalesItem} />
          <Route exact path="/salesitem/view/:id" component={SalesItem_View} />
          <Route exact path="/salesitem/edit/:id" component={EditSalesItem} />
          <Route exact path="/salesitem/add" component={AddSalesItem} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/employee" component={Employee} />
          <Route exact path="/employee/view/:id" component={Employee_View} />
          <Route exact path="/employee/add" component={AddEmployee} />
          <Route exact path="/employee/edit/:id" component={EditEmployee} />
          <Route exact path="/pricequote" component={Pricequote} />
          <Route exact path="/pricequote/view/:id" component={ViewPricequote} />
          <Route exact path="/pricequote/add" render={() => <div><AddPricequote setAlert={setAlert}/></div>} />
          <Route exact path="/pricequote/edit/:id" component={EditPricequote} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
