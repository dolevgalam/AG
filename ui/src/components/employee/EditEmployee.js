import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import { useIsMobileOrTablet } from ".././../utils/isMobileOrTablet"

const EditEmployee = () => {
  const isMobOrTab = useIsMobileOrTablet();
  let history = useHistory();
  const { id } = useParams();
  const [employee, setemployee] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dateofbirth: ""
    /*
  const [id, setId] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname,  SetLastname] = useState();
  const [email, SetEmail] = useState();
  const [phone, SetPhone] = useState();
  const [dateofbirth, SetDateofbirth] = useState();
    */
  });

  const { _id, firstname, lastname, email, phone, dateofbirth } = employee;
  const onInputChange = e => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loademployee();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.patch(`http://localhost:3001/employee/${id}`, employee);
    alert("Update employee successful!");
    history.push("/employee");
  };

  const loademployee = async () => {
    const result = await axios.get(`http://localhost:3001/employee/${id}`);
    setemployee(result.data);
  };
  return (
    <div className="container">
      <CanvasDraw
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}
      />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A employee</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
          id
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your id"
              name="id"
              value={_id}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>
          <div className="form-group">
          first name
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your First name"
              name="firstname"
              value={firstname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          last name
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Last name"
              name="lastname"
              value={lastname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          email
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          phone
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your phone"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          dateofbirth
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your dateofbirth"
              name="dateofbirth"
              value={dateofbirth}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
