import React from "react";
import "./Dashboard.css";
import CarouselImages from "../carousel/Carousel";
import NewsCard from "../newsCard/NewsCard";

const Dashboard = () => {
  
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
