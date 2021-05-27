import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditSalesItem = () => {
  let history = useHistory();
  const { id } = useParams();
  const [salesItem, setSalesItem] = useState({
    id: "",
    name: "",
    description: "",
    picturepath: "",
    date: ""
  });

  const { _id, name, description, picturepath, date } = salesItem;
  const onInputChange = e => {
    setSalesItem({ ...salesItem, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSalesItem();
  }, []);

  const onSubmit = async e => {
    console.log("onsubmit-ui");
    e.preventDefault();
    await axios.patch(`http://localhost:3001/salesItem/${id}`, salesItem);
    alert("Update salesitem successful!");
    history.push("/salesitem");
  };

  const loadSalesItem = async () => {
    const result = await axios.get(`http://localhost:3001/salesItem/${id}`);
    setSalesItem(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A SalesItem</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
          id
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your id"
              name="id"
              value={_id}
              onChange={e => onInputChange(e)}
              readOnly
            />
          </div>
          <div className="form-group">
          name
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          description
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          picturepath
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your picturepath"
              name="picturepath"
              value={picturepath}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          date
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your date"
              name="date"
              value={date}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update salesItem</button>
        </form>
      </div>
    </div>
  );
};

export default EditSalesItem;
