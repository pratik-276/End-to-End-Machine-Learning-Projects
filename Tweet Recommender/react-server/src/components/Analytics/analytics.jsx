import React, { Component } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { zoomOutLeft, zoomInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AnalyticChart from "./analyticcharts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Analytics extends Component {
  state = {
    username: "",
    topics: "",
    userTweets: [],
    popularTweets: [],
    stage: 1,
    loader: false,
    dummy_tweets: [
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        tweet_date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        tweet_date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        tweet_date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        tweet_date: "5th June, 2022",
      },
    ],
    tweetClick: "",
    tweetClicked: false,
    styles: {
      zoomOutLeft: {
        animation: "x 2s",
        animationName: Radium.keyframes(zoomOutLeft, "zoomOutLeft"),
      },
      zoomInDown: {
        animation: "x 1s",
        animationName: Radium.keyframes(zoomInDown, "zoomInDown"),
      },
    },
    outStyle: null,
    inStyle: null,
    tabvalue: 0,
    userStats: null,
    populationStats: null,
  };

  handleChange = (event, newValue) => {
    this.setState({ tabvalue: newValue });
  };
  getTweets = async () => {
    if (this.state.username.trim() === "") {
      toast.warning("Fields not entered properly");
    } else {
      this.setState({ loader: true });
      // setTimeout(() => {
      //   this.setState({ loader: false, userTweets: this.state.dummy_tweets });
      // }, 2000);
      const url =
        "http://127.0.0.1:5000/get-posts-by-user?user_name=" +
        this.state.username;
      await axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.setState({ userTweets: res.data.data });

          toast.success("Gotcha tweets!!!");
          this.setState({ loader: false });
        })
        .catch((err) => {
          this.setState({ loader: false });
        });
    }
  };
  getPopularTweets = async (content) => {
    if (!this.state.tweetClicked) {
      console.log(content);
      toast.warning("Fetching popular tweets. Please wait...");
      const url =
        "http://127.0.0.1:5000/get-popular-posts?t_id=" +
        content.tweet_id +
        "&username=" +
        this.state.username +
        "&topic=" +
        this.state.topics;
      this.setState({
        tweetClicked: true,
        tweetClick: content,
      });
      await axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.setState({
            outStyle: this.state.styles.zoomOutLeft,
            populationStats: {
              likes: res.data.likes,
              replies: res.data.replies,
              retweets: res.data.retweets,
            },
            userStats: {
              likes: res.data.min_faves,
              replies: res.data.min_replies,
              retweets: res.data.min_retweets,
            },
          });
          setTimeout(() => {
            this.setState({
              inStyle: this.state.styles.zoomInDown,
              popularTweets: res.data.data,
            });
          }, 2000);

          toast.success("Some recommendations!!!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className="container" style={{ height: "90vh" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="h-90 w-100 p-4 d-flex justify-content-center">
            {!this.state.loader ? (
              this.state.popularTweets.length > 0 ? (
                <StyleRoot>
                  <div
                    className="d-flex align-items-start justify-content-between w-90"
                    style={this.state.inStyle}
                  >
                    <div className={"border rounded w-40 p-3"}>
                      <div className="d-flex">
                        <div
                          className="d-flex flex-column"
                          style={{
                            width: "20%",
                          }}
                        >
                          <p
                            className={"fs-30 p-3 font-weight-bold border mb-0"}
                            style={{
                              borderRadius: "50%",
                              width: "80px",
                              height: "80px",
                              color: "white",
                              backgroundColor: "gray",
                            }}
                          >
                            {this.state.tweetClick.username[0].toUpperCase()}
                          </p>
                        </div>
                        <div
                          className="d-flex flex-column"
                          style={{
                            width: "80%",
                          }}
                        >
                          <p
                            className="text-left mb-0 fs-20 font-weight-bold cursor-pointer"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {this.state.tweetClick.username}
                          </p>
                          <p
                            className="text-left mb-3"
                            style={{
                              textAlign: "left",
                              fontStyle: "italic",
                            }}
                          >
                            {this.state.tweetClick.tweet_date}
                          </p>
                          <p
                            className="text-left"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {this.state.tweetClick.content}
                          </p>
                          <div className="d-flex justify-content-around">
                            <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-1 cursor-pointer">
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "5px",
                                }}
                              >
                                <i className="fas fa-comment-dots fs-20"></i>
                              </div>{" "}
                              <span>{this.state.userStats.replies}</span>
                            </div>
                            <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-2 cursor-pointer">
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "5px",
                                }}
                              >
                                <i className="fas fa-retweet fs-20"></i>
                              </div>{" "}
                              <span>{this.state.userStats.retweets}</span>
                            </div>
                            <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-3 cursor-pointer">
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "5px",
                                }}
                              >
                                <i className="far fa-heart fs-20"></i>
                              </div>{" "}
                              <span>{this.state.userStats.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-55 overflow-auto scrollbar-hidden d-flex flex-column justify-content-center align-items-center">
                      {/* <h2>Popular Tweets</h2> */}
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={this.state.tabvalue}
                            onChange={this.handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab label="Popular Tweets" {...a11yProps(0)} />
                            <Tab label="Analytics" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <TabPanel value={this.state.tabvalue} index={1}>
                          <AnalyticChart
                            populationStats={this.state.populationStats}
                            userStats={this.state.userStats}
                          />
                        </TabPanel>
                        <TabPanel value={this.state.tabvalue} index={0}>
                          {this.state.popularTweets.map((tweet) => (
                            <div className={"border-bottom w-100 p-3"}>
                              <div className="d-flex">
                                <div
                                  className="d-flex flex-column"
                                  style={{
                                    width: "20%",
                                  }}
                                >
                                  <p
                                    className={
                                      "fs-30 p-3 font-weight-bold border mb-0 " +
                                      (tweet.percentile_scores === "C"
                                        ? "bg-success"
                                        : tweet.percentile_scores === "B"
                                        ? "bg-warning"
                                        : "bg-danger")
                                    }
                                    style={{
                                      borderRadius: "50%",
                                      width: "80px",
                                      height: "80px",
                                      color: "white",
                                      // backgroundColor: "gray",
                                    }}
                                  >
                                    {tweet.username[0].toUpperCase()}
                                  </p>
                                </div>
                                <div
                                  className="d-flex flex-column"
                                  style={{
                                    width: "80%",
                                  }}
                                >
                                  <p
                                    className="text-left mb-0 fs-20 font-weight-bold cursor-pointer"
                                    style={{
                                      textAlign: "left",
                                    }}
                                  >
                                    {tweet.username}
                                  </p>
                                  <p
                                    className="text-left mb-3"
                                    style={{
                                      textAlign: "left",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    {tweet.tweet_date}
                                  </p>
                                  <p
                                    className="text-left"
                                    style={{
                                      textAlign: "left",
                                    }}
                                  >
                                    {tweet.tweet_content}
                                  </p>
                                  <div className="d-flex justify-content-around">
                                    <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-1 cursor-pointer">
                                      <div
                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        <i className="fas fa-comment-dots fs-20"></i>
                                      </div>{" "}
                                      <span>{tweet.reply_count}</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-2 cursor-pointer">
                                      <div
                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        <i className="fas fa-retweet fs-20"></i>
                                      </div>{" "}
                                      <span>{tweet.retweet_count}</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center p-1 tweet-icon-3 cursor-pointer">
                                      <div
                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        <i className="far fa-heart fs-20"></i>
                                      </div>{" "}
                                      <span>{tweet.like_count}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabPanel>
                      </Box>
                    </div>
                  </div>
                </StyleRoot>
              ) : this.state.userTweets.length > 0 ? (
                <StyleRoot>
                  <div
                    className="overflow-auto scrollbar-hidden d-flex flex-column justify-content-center align-items-center w-60 mx-auto"
                    style={this.state.outStyle}
                  >
                    <h2>Your Recent Activity</h2>
                    {this.state.userTweets.map((tweet) => (
                      <div className={"border-bottom w-100 p-3"}>
                        <div
                          className="d-flex cursor-pointer"
                          onClick={() => this.getPopularTweets(tweet)}
                        >
                          <div
                            className="d-flex flex-column"
                            style={{
                              width: "20%",
                            }}
                          >
                            <p
                              className={
                                "fs-30 p-3 font-weight-bold border mb-0 " +
                                (tweet.percentile_scores === "C"
                                  ? "bg-success"
                                  : tweet.percentile_scores === "B"
                                  ? "bg-warning"
                                  : "bg-danger")
                              }
                              style={{
                                borderRadius: "50%",
                                width: "80px",
                                height: "80px",
                                color: "white",
                                // backgroundColor: "gray",
                              }}
                            >
                              {tweet.username[0].toUpperCase()}
                            </p>
                          </div>
                          <div
                            className="d-flex flex-column"
                            style={{
                              width: "80%",
                            }}
                          >
                            <p
                              className="text-left mb-0 fs-20 font-weight-bold cursor-pointer"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {tweet.username}
                            </p>
                            <p
                              className="text-left mb-3"
                              style={{
                                textAlign: "left",
                                fontStyle: "italic",
                              }}
                            >
                              {tweet.tweet_date}
                            </p>
                            <p
                              className="text-left"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {tweet.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </StyleRoot>
              ) : (
                <div className="h-100 d-flex flex-column justify-content-center align-items-center w-60">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/whale1.jpg"
                      alt="happywhale"
                      style={{
                        borderRadius: "50%",
                        width: "300px",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control fs-22 p-2 mb-2"
                    placeholder="What's your username?"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    className="form-control fs-22 p-2"
                    placeholder="Topic"
                    value={this.state.topics}
                    rows={3}
                    style={{
                      resize: "none",
                    }}
                    onChange={(e) => this.setState({ topics: e.target.value })}
                  ></textarea>
                  <div className="d-flex justify-content-center my-3">
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "150px",
                      }}
                      onClick={() => this.getTweets()}
                    >
                      Get Tweets
                    </button>
                  </div>
                </div>
              )
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
              </Box>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;
