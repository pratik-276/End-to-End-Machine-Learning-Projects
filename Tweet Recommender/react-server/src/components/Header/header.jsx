import React, { useState } from "react";

const Header = ({ training, setTraining }) => {
  return (
    <div
      className="shadow d-flex align-items-center"
      style={{
        height: "70px",
        borderBottom: "1px solid lightgray",
      }}
    >
      <div
        className="d-flex justify-content-between mx-auto"
        style={{
          width: "90%",
        }}
      >
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
          }}
          className="mb-0"
        >
          TWEET RECOMMENDER
        </p>
        <div className="d-flex align-items-center">
          <p
            className="mb-0"
            style={{
              margin: "0px 20px",
              borderBottom: training
                ? "3px solid red"
                : "3px solid transparent",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onClick={() => setTraining(true)}
          >
            Recommender
          </p>
          <p
            className="mb-0"
            style={{
              margin: "0px 20px",
              borderBottom: !training
                ? "3px solid red"
                : "3px solid transparent",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onClick={() => setTraining(false)}
          >
            Analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
