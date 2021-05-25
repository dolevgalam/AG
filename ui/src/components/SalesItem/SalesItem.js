import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SalesItem = () => {
  const [salesItem, setSalesItem] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    picpath: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadSalesItem();
  }, []);
  const loadSalesItem = async () => {
    const res = await axios.get(`http://localhost:3001/salesItem/${id}`);
    console.log(res.data);
    if(res.data!=null){
      console.log(res);
      res.data.picturepath = 'http://localhost:3001' + res.data.picturepath
      setSalesItem(res.data);
    }
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">SalesItem Name: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">id: {salesItem._id}</li>
        <li className="list-group-item">name: {salesItem.name}</li>
        <li className="list-group-item">description: {salesItem.description}</li>
        <li className="list-group-item">date: {salesItem.date}</li>
        <li className="list-group-item">picturepath: {salesItem.picturepath}</li>
      </ul>
      <br></br>
      <img src={salesItem.picturepath}></img>
    </div>
  );
};

export default SalesItem;
