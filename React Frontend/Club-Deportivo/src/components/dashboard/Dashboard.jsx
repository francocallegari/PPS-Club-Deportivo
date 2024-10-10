import React from "react";
import "./Dashboard.css";
import { Button } from "react-bootstrap";
import CarouselImages from "../carousel/Carousel";
import { useNavigate } from "react-router-dom";
import NewsCard from "../newsCard/NewsCard";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleRegisterNavigation = (e) => {
    e.preventDefault();
    navigate("/register")
  }

  return (
    <div className="dashboard-container mb-5">
      <div>
        <CarouselImages />
      </div>
      <div>
        <NewsCard/>
      </div>
      <div className="div-button mt-5">
        <Button variant="dark" className="becomeMember-button" onClick={handleRegisterNavigation}>
          ASOCIARME AL CLUB
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
