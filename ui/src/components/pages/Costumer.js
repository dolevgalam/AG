import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Account = () => {

  const [account, setAccount] = useState([]);
  const [accountfilter, setAccountfilter] = useState([]);
  const [search, setSearch] = useState([]);
  

  useEffect(() => {
    loadAllAccount();
  }, []);

  const loadAllAccount = async () => {
    const result = await axios.get("http://localhost:3001/customer/");
    setAccount(result.data.reverse());
    setAccountfilter(result.data.reverse());
  };

  const deleteAccount = async name => {
    if (window.confirm('Are you sure you wish to delete this item?')){
      await axios.delete(`http://localhost:3001/customer//${name}`);
      console.log("delete" + " " + name);
      loadAllAccount();
    }
  };
  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = account.filter( (column) => 
    (column.phone.toLowerCase().includes(event.target.value))||(column.id.toLowerCase().includes(event.target.value))
    || column.firstname.toLowerCase().includes(event.target.value));
     setAccountfilter(filtered);
}

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      {/* {localStorage.getItem('user')} */}
        <h2 style={{marginLeft: 20}}>  Costumer</h2>
        <div className="contanier container-fluid">
          <input type = "text" style={{marginLeft:0 ,width: "250px"}}value={search} placeholder="Type for Search..." onChange= {handleInputChangeSearch}></input>
          <Link className="btn btn-primary" style={{right:0 ,marginLeft: 730}} to={`/Account/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark" style={{textAlign: "center"}}>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">F.Name</th>
              <th scope="col">L.Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {accountfilter.map((account, index) => (
              <tr style={{textAlign: "center"}}>
                <th scope="row">{index + 1}</th>
                <td>{account.id}</td>
                <td>{account.firstname}</td>
                <td>{account.lastname}</td>
                <td>{account.phone}</td>
                <td>{account.email}</td>
                <td>{account.city}</td>
                { <td className="d-flex">
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