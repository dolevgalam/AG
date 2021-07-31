import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Demo from './../layout/demo'
import './SalesItem.css';

const SalesItem = () => {

  const [salesitems, setSalesitems] = useState([]);
  const [salesitemsfilter, setSalesitemsfilter] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    loadAllSalesItem();
  }, []);

  const loadAllSalesItem = async () => {
    const result = await axios.get("http://localhost:3001/salesItem");
    setSalesitems(result.data.reverse());
    setSalesitemsfilter(result.data.reverse());
  };

  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = salesitems.filter((column) =>
      (column._id.toLowerCase().includes(event.target.value)) || (column.name.toLowerCase().includes(event.target.value))
      || column.description.toLowerCase().includes(event.target.value)
      || column.date.toLowerCase().includes(event.target.value));
    setSalesitemsfilter(filtered);
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      {/* {localStorage.getItem('user')} */}
      <h2 style={{ marginLeft: 20 }}>  Sales items</h2>
      <div className="contanier container-fluid">
        <input type="text" style={{ marginLeft: 0, width: "250px" }} value={search} placeholder="Type for Search..." onChange={handleInputChangeSearch}></input>
        <Link className="btn btn-primary" style={{ right: 0, marginLeft: 730 }} to={`/salesItem/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark" style={{ textAlign: "center" }}>
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
            {salesitemsfilter.map((salesItem, index) => (
              <tr style={{ textAlign: "center" }}>
                <th scope="row">{index + 1}</th>
                <td>{salesItem._id}</td>
                <td>{salesItem.name}</td>
                <td>{salesItem.description}</td>
                <td>{salesItem.date}</td>
                { <td className="d-flex">
                  <Link className="btn btn-info mr-2" to={`/salesItem/view/${salesItem.name}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/salesItem/edit/${salesItem.name}`}
                  >
                    Edit
                    </Link>
                    <Demo path={`http://localhost:3001/salesItem/${salesItem.name}`}/>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesItem;