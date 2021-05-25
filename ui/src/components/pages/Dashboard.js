import React, { useState, useEffect,Component } from "react";
import axios from "axios";
import { Link ,Redirect} from "react-router-dom";

const Dashboard = () => {
  if(!localStorage.getItem('token')){
    return <Redirect to='login'/>
  }

  return (
    
      <div className="py-4">
        {localStorage.getItem('user')}
        <h1>Dashboard</h1>
        
    </div>
  );
};

export default Dashboard;