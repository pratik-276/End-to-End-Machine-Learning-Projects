import React, { Component } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

class Home extends Component {
  state = {
    username: "",
    topics: "",
    loader: false,
    tweets: [],
    dummy_tweets: [
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        date: "5th June, 2022",
      },
      {
        username: "testuser",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium fugiat porro hic aspernatur, temporibus debitis quibusdam impedit voluptatem aut sapiente velit nobis, laborum architecto! Dolorum quidem nostrum cum sapiente ipsum perspiciatis ut necessitatibus! Incidunt at aperiam quas harum ducimus?",
        date: "5th June, 2022",
      },
    ],
  };
  getTweets = async () => {
    if (this.state.username.trim() === "" || this.state.topics.trim() === "") {
      toast.warning("Fields not entered properly");
    } else {
      this.setState({ loader: true });
      // setTimeout(() => {
      //   this.setState({ loader: false, tweets: this.state.dummy_tweets });
      // }, 3000);
      const url =
        "http://127.0.0.1:5000/get-posts?user_name=" +
        this.state.username +
        "&topics=" +
        this.state.topics;
      await axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.setState({ tweets: res.data.data });

          toast.success("Got new and tasty tweets for ya!!!");
          this.setState({ loader: false });
        })
        .catch((err) => {
          this.setState({ loader: false });
        });
    }
  };
  render() {
    return (
      <div className="container" style={{ height: "90vh" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="h-80 w-50 p-4">
            <img src="/home_image.svg" className="w-100" />
          </div>
          <div className="h-80 w-50 p-4">
            {!this.state.loader ? (
              this.state.tweets.length > 0 ? (
                <div className="d-flex flex-column overflow-auto scrollbar-hidden h-100">
                  {this.state.tweets.map((tweet) => (
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
                            className="text-left mb-0 fs-20 font-weight-bold"
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column h-100 justify-content-center align-items-center w-75 mx-auto">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/whale1.jpg"
                      alt="happywhale"
                      style={{
                        borderRadius: "50%",
                        width: "200px",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control my-3 fs-16 w-80"
                    placeholder="Twitter username"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    className="form-control fs-16 w-80"
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

export default Home;
