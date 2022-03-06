import React, { useState } from "react";
import "./App.css";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.css";
import Training from "./Body";
import Prediction from "./Prediction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

function App() {
  const [training, setTraining] = useState(true);
  const [predseries, setPredSeries] = useState([
    {
      name: "Prediction RMSE",
      type: "line",
      data: [],
    },
  ]);
  const [trainseries, setTrainSeries] = useState([
    {
      name: "Training RMSE",
      type: "line",
      data: [
        // {
        //   x: "XGB-0",
        //   y: 54,
        //   description: {
        //     rmse: 54,
        //     max_depth: 1,
        //     nestimators: 100,
        //     learningRate: 0.5,
        //   },
        // },
      ],
    },
  ]);
  return (
    <div className="App">
      <Header training={training} setTraining={setTraining} />
      {training ? (
        <Training series={trainseries} setSeries={setTrainSeries} />
      ) : (
        <Prediction series={predseries} setSeries={setPredSeries} />
      )}
      <Footer />
      <ToastContainer autoClose={2000} theme="colored" pauseOnHover />
    </div>
  );
}

export default App;
