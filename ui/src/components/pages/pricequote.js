import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Demo from '../layout/demo'
const Pricequote = () => {

  const [pricequote, setpricequote] = useState([]);
  const [pricequotefilter, setpricequotefilter] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    loadAllSalesItem();
  }, []);

  const loadAllSalesItem = async () => {
    const result = await axios.get("http://localhost:3001/pricequote");
    setpricequote(result.data.reverse());
    setpricequotefilter(result.data.reverse());
  };

  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = pricequote.filter((column) =>
      (column._id.toLowerCase().includes(event.target.value)) || (column.name.toLowerCase().includes(event.target.value))
      || column.description.toLowerCase().includes(event.target.value)
      || column.date.toLowerCase().includes(event.target.value));
    setpricequotefilter(filtered);
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      <h2 style={{ marginLeft: 20 }}>  Price Quote</h2>
      <div className="contanier container-fluid">
        <input type="text" style={{ marginLeft: 0, width: "250px" }} value={search} placeholder="Type for Search..." onChange={handleInputChangeSearch}></input>
        <Link className="btn btn-primary" style={{ right: 0, marginLeft: 730 }} to={`/pricequote/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark" style={{ textAlign: "center" }}>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pricequotefilter.map((pricequote, index) => (
              <tr style={{ textAlign: "center" }}>
                <th scope="row">{index + 1}</th>
                <td>{pricequote._id}</td>
                <td>{pricequote.date}</td>
                <td>{pricequote.description}</td>                
                <td>{pricequote.price}</td>
                <td>{pricequote.status}</td>
                { <td>
                  <Link className="btn btn-info mr-2" to={`/pricequote/view/${pricequote._id}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/pricequote/edit/${pricequote._id}`}
                  >
                    Edit
                    </Link>
                    <Demo path={`http://localhost:3001/pricequote/${pricequote._id}`}/>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricequote;