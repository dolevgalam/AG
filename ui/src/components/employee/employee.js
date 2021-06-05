import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [Employee, setEmployee] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dateofbirth: "",
    picpath: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadEmployee();
  }, []);
  const loadEmployee = async () => {
    const res = await axios.get(`http://localhost:3001/Employee/${id}`);
    console.log(res.data);
    if(res.data!=null){
      console.log(res);
      res.data.picturepath = 'http://localhost:3001' + res.data.picturepath
      setEmployee(res.data);
    }
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Employee Name: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">id: {Employee._id}</li>
        <li className="list-group-item">firstname: {Employee.firstname}</li>
        <li className="list-group-item">lastname: {Employee.lastname}</li>
        <li className="list-group-item">email: {Employee.email}</li>
        <li className="list-group-item">phone: {Employee.phone}</li>
        <li className="list-group-item">dateofbirth: {Employee.dateofbirth}</li>
      </ul>
      <br></br>
      <img src={Employee.picturepath}></img>
    </div>
  );
};

export default Employee;
