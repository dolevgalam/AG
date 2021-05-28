import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Quote = () => {

  const [quote, setQuotes] = useState([]);

  useEffect(() => {
    loadAllQuote();
  }, []);

  const loadAllQuote = async () => {
    const result = await axios.get("http://localhost:3001/priceQuote");
    setQuotes(result.data.reverse());
  };

  const deleteQuote = async name => {
    await axios.delete(`http://localhost:3001/priceQuote/${name}`);
    console.log("delete" + " " + name);
    loadAllQuote();
  };
  if (!localStorage.getItem('token')) {
    return <Redirect to='login' />
  }
  return (

    <div className="container">
      {/* {localStorage.getItem('user')} */}
      <div className="py-4">
        <div className="form-group row">
          <h2>Quotes</h2>
          <Link className="btn btn-primary" to={`/Quote/add`}>Add New</Link>
        </div>
        <table className="table border shadow">
          <thead className="thead-dark">
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
            {quote.map((quote, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{quote._id}</td>
                {/* <td>{quote.name}</td> */}
                <td>{quote.date}</td>
                <td>{quote.description}</td>                
                <td>{quote.price}</td>
                <td>{quote.status}</td>
                { <td>
                  <Link className="btn btn-info mr-2" to={`/quote/view/${quote.name}`}>
                    View
                    </Link>
                  <Link
                    className="btn btn-outline-secondary mr-2"
                    to={`/Quote/edit/${quote.name}`}
                  >
                    Edit
                    </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteQuote(quote.name)}
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

export default Quote;