import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FileUploader from "../files/FileUploader";

function AddSalesItem() {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();


  const send = event => {
    console.log("send");
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    data.append("description", description);
    console.log(name);
    console.log(file);
    console.log(description);

    axios.post("http://localhost:3001/salesItem", data)
      .then(res => alert("success"))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A SalesItem</h2>
        <div className="App">
          <header className="App-header">
            <form action="#">
              <div className="form-control form-control-lg form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={event => {
                    const { value } = event.target;
                    setName(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={event => {
                    const { value } = event.target;
                    setDescription(value);
                  }}
                />
              </div>
              <div className="form-control form-control-lg">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  id="file"
                  accept=".jpg"
                  onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
              </div>
            </form>
            <button className="btn btn-primary btn-block" onClick={send}>Add SalesItem</button>
          </header>
        </div>
      </div>
    </div>
  );
}

export default AddSalesItem;