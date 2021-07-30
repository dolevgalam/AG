import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Demo from '../layout/demo'

const Order = () => {

  const [order, setorder] = useState([]);
  const [orderfilter, setorderfilter] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    loadAllSalesItem();
  }, []);

  const loadAllSalesItem = async () => {
    const result = await axios.get("http://localhost:3001/order");
    console.log(result.data.reverse())
    setorder(result.data.reverse());
    setorderfilter(result.data.reverse());
  };

  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = order.filter((column) =>
      (column._id.toLowerCase().includes(event.target.value)) || (column.name.toLowerCase().includes(event.target.value))
      || column.description.toLowerCase().includes(event.target.value)
      || column.date.toLowerCase().includes(event.target.value));
    setorderfilter(filtered);
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      <div className="contanier container-fluid">
        <br/>
        <input type="text" style={{ marginLeft: 0, width: "250px" }} value={search} placeholder="Type for Search..." onChange={handleInputChangeSearch}></input>
        <Link className="btn btn-primary" style={{ right: 0, marginLeft: 730 }} to={`/order/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark" style={{ textAlign: "center" }}>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderfilter.map((order, index) => (
              <tr style={{ textAlign: "center" }}>
                <th scope="row">{index + 1}</th>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.description}</td>                
                <td>{order.price}</td>
                <td>{order.statusorder}</td>
                { <td className="d-flex justify-content-center">
                  <Link className="btn btn-info mr-2" to={`/order/view/${order._id}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/order/edit/${order._id}`}
                  >
                    Edit
                    </Link>
                    <Demo path={order._id}/>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;