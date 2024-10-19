import React from "react";
import "./Dashboard.css";
import { Button } from "react-bootstrap";
import CarouselImages from "../carousel/Carousel";
import { useNavigate } from "react-router-dom";
import NewsCard from "../newsCard/NewsCard";

const Dashboard = () => {

  const navigate = useNavigate();


  return (
    <div className="dashboard-container mb-5">
      <div>
        <CarouselImages />
      </div>
      <div>
        <NewsCard/>
      </div>
   
    </div>
  );
};

export default Dashboard;
