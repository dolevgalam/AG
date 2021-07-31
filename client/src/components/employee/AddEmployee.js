import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FileUploader from "../files/FileUploader";

function AddEmployee() {
  const [id, setId] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname,  SetLastname] = useState();
  const [email, SetEmail] = useState();
  const [phone, SetPhone] = useState();
  const [dateofbirth, SetDateofbirth] = useState();

  const [file, setFile] = useState();

  const history = useHistory();
  const send = event => {
    
    const data = new FormData();
    data.append("id", id);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("phone", phone);
    data.append("dateofbirth", dateofbirth);
    data.append("file", file);

    axios.post("http://localhost:3001/employee", data)
      .then(res => alert(res.data));
      history.push("/employee");
    
      // .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A employee</h2>
        <div className="App">
          <header className="App-header">
            <form action="#">
            <div className="form-control form-control-lg form-group">
                <label htmlFor="firstname">id</label>
                <input
                  type="text"
                  id="id"
                  onChange={event => {
                    const { value } = event.target;
                    setId(value);
                  }}
                />
              </div>  
              <div className="form-control form-control-lg form-group">
                <label htmlFor="firstname">First name</label>
                <input
                  type="text"
                  id="firstname"
                  onChange={event => {
                    const { value } = event.target;
                    setFirstname(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg form-group">
                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  id="lastname"
                  onChange={event => {
                    const { value } = event.target;
                    SetLastname(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  onChange={event => {
                    const { value } = event.target;
                    SetEmail(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  onChange={event => {
                    const { value } = event.target;
                    SetPhone(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg">
                <label htmlFor="dateofbirth">Dateofbirth</label>
                <input
                  type="date"
                  id="dateofbirth"
                  onChange={event => {
                    const { value } = event.target;
                    SetDateofbirth(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  id="file"
                  accept=".jpg"
                  onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
              </div>
            </form>
            <button className="btn btn-primary btn-block" onClick={send}>Add Employee</button>
          </header>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;