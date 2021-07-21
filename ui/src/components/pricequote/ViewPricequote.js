import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Viewpricequote = () => {
  const [pricequote, setpricequote] = useState({
    id: "",
    description: "",
    date: "",
    picpath: "",
    price: "",
    status: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadpricequote();
  }, []);
  const loadpricequote = async () => {
    const res = await axios.get(`http://localhost:3001/pricequote/${id}`);
    console.log(res);
    if(res.data!=null){
      console.log(res);
      res.data.picturepath = 'http://localhost:3001' + res.data.picturepath
      setpricequote(res.data);
    }
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">pricequote Name: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">id: {pricequote._id}</li>
        <li className="list-group-item">name: {pricequote.name}</li>
        <li className="list-group-item">description: {pricequote.description}</li>
        <li className="list-group-item">date: {pricequote.date}</li>
        <li className="list-group-item">picturepath: {pricequote.picturepath}</li>
      </ul>
      <br></br>
      <img src={pricequote.picturepath}></img>
    </div>
  );
};

export default Viewpricequote;
