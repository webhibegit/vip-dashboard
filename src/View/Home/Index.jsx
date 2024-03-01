import React from "react";
import HomeCard from "./HomeCard";
import "./Home.css";
import ChartBox from "./ChartBox";
import PieChartsBox from "./PieChartsBox";

const Index = () => {
  return (
    <>
      <div className="main_wrap ">
        <div className="container-fluid">
          <HomeCard />

          <div className="row mt-2">
            <div className="col-md-7 col-12">
              <ChartBox />
            </div>
            <div className="col-md-5 col-12">
              <PieChartsBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
