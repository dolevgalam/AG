import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Account = () => {

  const [account, setAccount] = useState([]);

  useEffect(() => {
    loadAllAccount();
  }, []);

  const loadAllAccount = async () => {
    const result = await axios.get("http://localhost:3001/customer/");
    setAccount(result.data.reverse());
  };

  const deleteAccount = async name => {
    await axios.delete(`http://localhost:3001/customer//${name}`);
    console.log("delete" + " " + name);
    loadAllAccount();
  };
  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (

    <div className="container">
      {/* {localStorage.getItem('user')} */}
      <div className="py-4">
        <div className="form-group row">
          <h2>Costumer</h2>
          <Link className="btn btn-primary" to={`/Account/add`}>Add New</Link>
        </div>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {account.map((account, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{account.id}</td>
                <td>{account.firstname}</td>
                <td>{account.lastname}</td>
                <td>{account.phone}</td>
                <td>{account.email}</td>
                <td>{account.city}</td>
                { <td>
                  <Link className="btn btn-info mr-2" to={`/Account/view/${account.name}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/Account/edit/${account.name}`}
                  >
                    Edit
                    </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteAccount(account.name)}
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

export default Account;