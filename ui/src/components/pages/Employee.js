import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Employee  = () => {

  const [Employee, setEmployee] = useState([]);
  const [Employeefilter, setEmployeefilter] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    loadAllEmployee ();
  }, []);

  const loadAllEmployee  = async () => {
    console.log("load start");
    const result = await axios.get("http://localhost:3001/employee");
    console.log(result.data);
    setEmployee(result.data.reverse());
    setEmployeefilter(result.data.reverse());
  };

  const deleteEmployee  = async id => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      await axios.delete(`http://localhost:3001/employee/${id}`);
      console.log("delete" + " " + id);
      alert("delete success");
      loadAllEmployee ();
    }
  };

  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = Employee.filter((column) =>
      (column._id.toLowerCase().includes(event.target.value)) || (column.firstname.toLowerCase().includes(event.target.value))
      || column.lastname.toLowerCase().includes(event.target.value)
      || column.email.toLowerCase().includes(event.target.value)
      || column.phone.toLowerCase().includes(event.target.value)
      || column.dateofbirth.toLowerCase().includes(event.target.value));
    setEmployeefilter(filtered);
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      {/* {localStorage.getItem('user')} */}
      <h2 style={{ marginLeft: 20 }}>  Employee</h2>
      <div className="contanier container-fluid">
        <input type="text" style={{ marginLeft: 0, width: "250px" }} value={search} placeholder="Type for Search..." onChange={handleInputChangeSearch}></input>
        <Link className="btn btn-primary" style={{ right: 0, marginLeft: 730 }} to={`/employee/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark" style={{textAlign: "center"}}>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Dateofbirth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Employeefilter.map((Employee , index) => (
              <tr style={{textAlign: "center"}}>
                <th scope="row">{index + 1}</th>
                <td>{Employee ._id}</td>
                <td>{Employee .firstname}</td>
                <td>{Employee .lastname}</td>
                <td>{Employee .email}</td>
                <td>{Employee .phone}</td>
                <td>{Employee .dateofbirth}</td>
                { <td>
                  <Link className="btn btn-info mr-2" to={`/employee/view/${Employee._id}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/employee/edit/${Employee ._id}`}
                  >
                    Edit
                    </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteEmployee (Employee ._id)}
                  >
                    Delete
                    </Link>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee ;