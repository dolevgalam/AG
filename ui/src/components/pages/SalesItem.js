import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SalesItem = () => {
    const [salesitems, setSalesitems] = useState([]);

    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:3001/salesItem");
      setSalesitems(result.data.reverse());
    };
  
    const deleteUser = async name => {
      await axios.delete(`http://localhost:3001/salesItem/${name}`);
      console.log("delete" + " " + name);
      loadUsers();
    };
  //{"id":{"$oid":"60a031a47c58de22f46679f5"},"name":"blue","description":"blue-item-","picturepath":"/images/close.PNG","date":{"$date":{"$numberLong":"1621111204401"}},"_v":{"$numberInt":"0"}}
    return (
      <div className="container">
        <div className="py-4">
          <h1>Sales item</h1>
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
              {salesitems.map((salesItem, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{salesItem._id}</td>
                  <td>{salesItem.name}</td>
                  <td>{salesItem.description}</td>
                  <td>{salesItem.date}</td>
                  { <td>
                    <Link class="btn btn-primary mr-2" to={`/salesItem/${salesItem.name}`}>
                      View
                    </Link>
                    {/* <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link> */}
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteUser(salesItem.name)}
                    >
                      Delete
                    </Link>
                  </td> }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default SalesItem;