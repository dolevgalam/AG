import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SalesItem = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
      loadSaleItem();
    }, []);
  
    const loadSaleItem = async () => {
      const result = await axios.get("http://localhost:3000/salesItem");
      console.log(result.data);
      setUser(result.data.reverse());
    };
  
    const deleteUser = async id => {
      await axios.delete(`http://localhost:3003/users/${id}`);
      loadSaleItem();
    };
  
    return (
      <div className="container">
        <div className="py-4">
          <h1>Sales item</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                      View
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default SalesItem;