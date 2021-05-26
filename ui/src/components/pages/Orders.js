import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    const result = await axios.get("http://localhost:3001/ordeers");
    setOrders(result.data.reverse());
  };

  const deleteOrders = async name => {
    await axios.delete(`http://localhost:3001/orders/${name}`);
    console.log("delete" + " " + name);
    loadAllOrders();
  };
  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (

    <div className="container">
      {/* {localStorage.getItem('user')} */}
      <div className="py-4">
        <div class="form-group row">
          <h2>Orders</h2>
          <Link className="btn btn-primary" to={`/orders/add`}>Add New</Link>
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
            {orders.map((orders, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{orders._id}</td>
                <td>{orders.name}</td>
                <td>{orders.description}</td>
                <td>{orders.date}</td>
                { <td>
                  <Link class="btn btn-info mr-2" to={`/Orders/view/${orders.name}`}>
                    View
                    </Link>
                  <Link
                    class="btn btn-outline-secondary mr-2"
                    to={`/Orders/edit/${orders.name}`}
                  >
                    Edit
                    </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteOrders(orders.name)}
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

export default Orders;