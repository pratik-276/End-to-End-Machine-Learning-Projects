import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Prediction = ({ series, setSeries }) => {
  const [line, setLine] = useState(true);
  const [modelMode, setModelMode] = useState(true);
  const [model, setModel] = useState("rf");
  const [rf, setRF] = useState(0.4);
  const [xgb, setXGB] = useState(0.6);
  const [lgbm, setLGBM] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const options = {
    chart: {
      id: "prediction_errors",
      toolbar: {
        show: true,
      },
    },
    // plotOptions: {
    //   bar: {
    //     columnWidth: "10%",
    //   },
    // },
    stroke: {
      width: [4, 0, 0],
    },
    xaxis: {
      //categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      type: "category",
    },
    // tooltip: {
    //   custom: function (opts) {
    //     const desc =
    //       opts.ctx.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
    //         .description;
    //     const rmse = desc.rmse;
    //     const max_depth = desc.max_depth;
    //     let text = "RMSE: " + rmse + "<br>";
    //     text += "Max Depth : " + max_depth + "<br>";

    //     return text;
    //   },
    // },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 20000,
    },
  };
  // const [series, setSeries] = useState([
  //   {
  //     name: "Root Mean Squared Error",
  //     type: "line",
  //     //   data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  //     data: [
  //       // {
  //       //   x: "XGB-1",
  //       //   y: 54,
  //       //   description: {
  //       //     rmse: 54,
  //       //     max_depth: 1,
  //       //   },
  //       // },
  //     ],
  //   },
  // ]);

  useEffect(() => {
    setSeries([
      {
        ...series[0],
        type: line ? "line" : "bar",
      },
    ]);
  }, [line]);

  const predict = async () => {
    if (!modelMode && rf + xgb + lgbm !== 1) {
      toast.warning(
        "Sum of all model values should be 1. Now it is " + (rf + xgb)
      );
    } else {
      setLoading(true);
      const body = {
        rf: modelMode ? (model === "rf" ? 1.0 : 0.0) : rf,
        xgb: modelMode ? (model === "xgb" ? 1.0 : 0.0) : xgb,
        lgbm: modelMode ? (model === "lgbm" ? 1.0 : 0.0) : lgbm,
        blend: !modelMode,
      };
      await axios
        .post(
          "https://pratik-housing-prices-flask.herokuapp.com/prediction",
          body
        )
        .then((res) => {
          console.log("RMSE error: ", res.data);
          const newData = {
            x:
              (modelMode
                ? model === "rf"
                  ? "Random Forest"
                  : model === "xgb"
                  ? "XGBoost"
                  : "LightGBM"
                : `${rf}*RF + ${xgb}*XGB + ${lgbm}*LGBM`) +
              `-${series[0].data.length}`,
            y: Math.round(res.data),
          };
          const data = series[0].data;
          data.push(newData);
          setSeries([
            {
              ...series[0],
              data: data,
            },
          ]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Sorry, Server crashed :(. To get better experience run in local."
          );
          setLoading(false);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        alignItems: "center",
      }}
    >
      <div
        className="d-flex justify-content-between mx-auto"
        style={{
          width: "90%",
        }}
      >
        <div className="w-50 d-flex flex-column align-items-center">
          <div
            className="d-flex justify-content-center align-items-center rounded my-2 p-1"
            style={{
              backgroundColor: "#EDF4F6",
              border: "1px solid var(--border-color)",
              width: "200px",
              cursor: "pointer",
            }}
          >
            <p
              className={"mb-0 rounded px-1 text-center w-50"}
              onClick={() => {
                setLine(true);
              }}
              style={{
                color: line ? "white" : "black",
                backgroundColor: line ? "#7B6FF0" : "#EDF4F6",
              }}
            >
              Line Chart
            </p>
            <p
              className={"mb-0 rounded px-1 text-center w-50"}
              onClick={() => {
                setLine(false);
              }}
              style={{
                color: !line ? "white" : "black",
                backgroundColor: !line ? "#7B6FF0" : "#EDF4F6",
              }}
            >
              Bar Chart
            </p>
          </div>
          {series[0].data.length === 0 && (
            <p className="text-danger">Train Models to get data in chart</p>
          )}
          <Chart
            options={options}
            series={series}
            type="line"
            width={500}
            height={320}
          />
        </div>

        <div className="w-50">
          <div className="px-5 py-2">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center my-4">
                <p
                  className="mb-0"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Model Mode
                </p>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#EDF4F6",
                    border: "1px solid #EDF4F6",
                    width: "400px",
                    cursor: "pointer",
                  }}
                >
                  <p
                    className={"mb-0 p-1 text-center w-50"}
                    onClick={() => {
                      setModelMode(true);
                    }}
                    style={{
                      color: modelMode === true ? "white" : "black",
                      backgroundColor:
                        modelMode === true ? "#7B6FF0" : "#EDF4F6",
                    }}
                  >
                    Single
                  </p>
                  <p
                    className={"mb-0 p-1 text-center w-50"}
                    onClick={() => {
                      setModelMode(false);
                    }}
                    style={{
                      color: modelMode === false ? "white" : "black",
                      backgroundColor:
                        modelMode === false ? "#7B6FF0" : "#EDF4F6",
                    }}
                  >
                    Blend
                  </p>
                </div>
              </div>

              {modelMode ? (
                <>
                  <div className="d-flex justify-content-between align-items-center my-4">
                    <p
                      className="mb-0"
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Model Name
                    </p>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "#EDF4F6",
                        border: "1px solid #EDF4F6",
                        width: "400px",
                        cursor: "pointer",
                      }}
                    >
                      <p
                        className={"mb-0 p-1 text-center w-50"}
                        onClick={() => {
                          setModel("rf");
                        }}
                        style={{
                          color: model === "rf" ? "white" : "black",
                          backgroundColor:
                            model === "rf" ? "#7B6FF0" : "#EDF4F6",
                        }}
                      >
                        Random Forest
                      </p>
                      <p
                        className={"mb-0 p-1 text-center w-50"}
                        onClick={() => {
                          setModel("xgb");
                        }}
                        style={{
                          color: model === "xgb" ? "white" : "black",
                          backgroundColor:
                            model === "xgb" ? "#7B6FF0" : "#EDF4F6",
                        }}
                      >
                        XGBoost
                      </p>
                      <p
                        className={"mb-0 p-1 text-center w-50"}
                        // onClick={() => {
                        //   setModel("lgbm");
                        // }}
                        style={{
                          color: model === "lgbm" ? "white" : "black",
                          backgroundColor:
                            model === "lgbm" ? "#7B6FF0" : "#EDF4F6",
                        }}
                      >
                        LightGBM
                      </p>
                    </div>
                  </div>

                  <p className="text-danger text-left">
                    LGBM crashes on heroku. To use it, download the code and use
                    in local.
                  </p>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center my-4">
                    <p
                      className="mb-0"
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Random Forest Regressor
                    </p>
                    <Slider
                      aria-label="Volume"
                      value={rf}
                      onChange={(e, v) => setRF(v)}
                      style={{
                        width: "200px",
                      }}
                      getAriaValueText={(v) => `${v}`}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0.0}
                      max={1.0}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center my-4">
                    <p
                      className="mb-0"
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      XGBoost Regressor
                    </p>
                    <Slider
                      aria-label="Volume"
                      value={xgb}
                      onChange={(e, v) => setXGB(v)}
                      style={{
                        width: "200px",
                      }}
                      getAriaValueText={(v) => `${v}`}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0.0}
                      max={1.0}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center my-4">
                    <p
                      className="mb-0"
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      LightGBM Regressor
                    </p>
                    <Slider
                      aria-label="Volume"
                      value={lgbm}
                      onChange={(e, v) => setLGBM(v)}
                      style={{
                        width: "200px",
                      }}
                      getAriaValueText={(v) => `${v}`}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0.0}
                      max={1.0}
                      disabled
                    />
                  </div>
                  <p className="text-danger text-left">
                    LGBM crashes on heroku. To use it, download the code and use
                    in local.
                  </p>
                </>
              )}

              <div className="d-flex justify-content-center my-4">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <button
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#EDF4F6",
                      borderColor: "#7B6FF0",
                      width: "200px",
                    }}
                    onClick={predict}
                  >
                    Predict
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
