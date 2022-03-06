import React, { useState } from "react";

const Footer = () => {
  return (
    <div
      className="d-flex align-items-center mt-auto border-top pt-2"
      style={{
        height: "70px",
        //borderBottom: "1px solid lightgray",
      }}
    >
      <div
        className="d-flex justify-content-center mx-auto"
        style={{
          width: "80%",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            margin: "0px 10px",
          }}
        >
          Link to Code:{" "}
          <a
            href="https://www.kaggle.com/pratik1120/housing-prices-eda-processing-and-modelling"
            target="_blank"
          >
            Kaggle Notebook Link
          </a>
        </p>
        |
        <p
          style={{
            fontSize: "18px",
            margin: "0px 10px",
          }}
        >
          Link to Whole Application:{" "}
          <a
            href="https://github.com/pratik-276/End-to-End-Machine-Learning-Projects"
            target="_blank"
          >
            Github Repo Link
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
