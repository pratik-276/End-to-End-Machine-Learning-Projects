import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/header";
import Home from "./components/Home/home";
import Analytics from "./components/Analytics/analytics";

function App() {
  const [training, setTraining] = useState(true);
  return (
    <div className="App">
      <Header training={training} setTraining={setTraining} />
      {training ? <Home /> : <Analytics />}
      <ToastContainer autoClose={2000} theme="colored" pauseOnHover />
    </div>
  );
}

export default App;
