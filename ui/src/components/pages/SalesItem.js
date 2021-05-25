import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,Redirect } from "react-router-dom";

const SalesItem = () => {
  
    const [salesitems, setSalesitems] = useState([]);

    useEffect(() => {
      loadAllSalesItem();
    }, []);
  
    const loadAllSalesItem = async () => {
      const result = await axios.get("http://localhost:3001/salesItem");
      setSalesitems(result.data.reverse());
    };
  
    const deleteSalesItem = async name => {
      await axios.delete(`http://localhost:3001/salesItem/${name}`);
      console.log("delete" + " " + name);
      loadAllSalesItem();
    };
    if(!localStorage.getItem('token')){
      return <Redirect to='login'/>
    }
    return (
     
      <div className="container">
         {/* {localStorage.getItem('user')} */}
        <div className="py-4">
         <div class="form-group row"> 
          <h2>Sales item</h2> 
          <Link className="btn btn-primary" to={`/salesItem/add`}>Add New</Link>
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
              {salesitems.map((salesItem, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{salesItem._id}</td>
                  <td>{salesItem.name}</td>
                  <td>{salesItem.description}</td>
                  <td>{salesItem.date}</td>
                  { <td>
                    <Link class="btn btn-info mr-2" to={`/salesItem/view/${salesItem.name}`}>
                      View
                    </Link>
                    <Link
                      class="btn btn-outline-secondary mr-2"
                      to={`/salesItem/edit/${salesItem.name}`}
                    >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteSalesItem(salesItem.name)}
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