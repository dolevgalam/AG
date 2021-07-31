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
    console.log(result.data.reverse())
    setpricequote(result.data.reverse());
    setpricequotefilter(result.data.reverse());
  };

  function handleInputChangeSearch(event) {
    setSearch(event.target.value);
    const filtered = pricequote.filter((column) =>
      (column._id.toLowerCase().includes(event.target.value)) || (column.description.includes(event.target.value)));
      // || column.description.toLowerCase().includes(event.target.value)
      // || column.date.toLowerCase().includes(event.target.value));

      // (column._id.toLowerCase().includes(event.target.value)) || (column.name.toLowerCase().includes(event.target.value))
      // || column.description.toLowerCase().includes(event.target.value)
      // || column.date.toLowerCase().includes(event.target.value));
    setpricequotefilter(filtered);
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (
    <div className="container container-fluid container-md">
      <div className="contanier container-fluid">
        <br/>
        <input type="text" style={{ textAlign:"center", marginLeft: 0, width: "250px" }} value={search} placeholder="Type for Search..." onChange={handleInputChangeSearch}></input>
        <Link className="btn btn-primary" style={{ right: 0, marginLeft: 730 }} to={`/pricequote/add`}>Add New</Link>
        <table className="table border shadow table-striped table-hover mt-xl-4">
          <thead className="thead-dark flex" style={{ textAlign: "center" }}>
            <tr className="flex">
              <th scope="col">Index</th>
              {/* <th scope="col">Id</th> */}
              <th scope="col">Customer</th>
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
                <td className="flex">{pricequote._id}</td>
                {/* <td>{pricequote.customer}</td> */}
                <td>{pricequote.date}</td>
                <td className="flex">{pricequote.description}</td>                
                <td>{pricequote.price}</td>
                <td>{pricequote.status}</td>
                { <td className="d-flex justify-content-center">
                  <Link className="btn btn-info mr-2" to={`/pricequote/view/${pricequote._id}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/pricequote/edit/${pricequote._id}`}
                  >
                    Edit
                    </Link>
                    <Demo path={pricequote._id}/>
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