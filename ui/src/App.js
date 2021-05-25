import React from "react"; //123456
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import {
  BrowserRouter as Router,Route,Switch,withRouter } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import SalesItem from "./components/pages/SalesItem";
import SalesItem_View from "./components/SalesItem/SalesItem";
import EditSalesItem from "./components/SalesItem/EditSalesItem";
import AddSalesItem from "./components/SalesItem/AddSalesItem";


function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/salesitem" component={SalesItem} />
          <Route exact path="/salesitem/view/:id" component={SalesItem_View} />
          <Route exact path="/salesitem/edit/:id" component={EditSalesItem} />
          <Route exact path="/salesitem/add" component={AddSalesItem} />


          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
