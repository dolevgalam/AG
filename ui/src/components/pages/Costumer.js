import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Account = () => {

  const [account, setAccount] = useState([]);

  useEffect(() => {
    loadAllAccount();
  }, []);

  const loadAllAccount = async () => {
    const result = await axios.get("http://localhost:3001/account");
    setAccount(result.data.reverse());
  };

  const deleteAccount = async name => {
    await axios.delete(`http://localhost:3001/account/${name}`);
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
        <div class="form-group row">
          <h2>Account</h2>
          <Link className="btn btn-primary" to={`/Account/add`}>Add New</Link>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {account.map((account, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{Account._id}</td>
                <td>{Account.name}</td>
                <td>{Account.description}</td>
                <td>{Account.date}</td>
                { <td>
                  <Link class="btn btn-info mr-2" to={`/Account/view/${account.name}`}>
                    View
                    </Link>
                  <Link
                    class="btn btn-outline-secondary mr-2"
                    to={`/Account/edit/${account.name}`}
                  >
                    Edit
                    </Link>
                  <Link
                    class="btn btn-danger"
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