# Introduction

[TweetNiche](https://thawing-garden-45544.herokuapp.com/) is a tool built for Twitter users & content creators looking to better understand the audience in their niche. Newbies to content creation often start out writing on a broad range of topics before finding a dedicated audience for a niche. Along the way, it is important to learn and understand various topics and explore several niche's before landing on one that works.

TweetNiche has two components: a recommender & a tweet analytics tool. 
Often, a user's Twitter feed is filled with content from a wide range of the user's interest and it can be hard to study a niche. TweetNiche recommends tweets which from user specified niche but also factoring in user's own tweets to maintain the relevance to the user.

The user may expect a tweet to perform well however reality may be different. TweetNiche's tweet analytics tool can help study a tweet's performance by showing a user's tweet in relation to other tweets in the Niche that are most similar but more popular than the user's tweet.


## Developers

1. Aman Pawar
2. Alvin Vinod
3. Ojas Kulkarni
4. Pratik Mukherjee



## Project Outline

### 1. Scope of the project:

* Recommend tweets specific to a niche that is relevant to the user
* Provide comparitive analysis for a user's tweet in the niche. 

### 2. Data:

Data will be scraped from twitter using snscrape API. The API allows extractions of tweets related to certain keywords and that posted by any user. The script can scrape 10,000 tweets in 20 minutes. 


### 3. Approach:

Part I
1. Extract user's tweets and tweets based on user specified topic from Twitter using snscrape library.
2. Processes both sets of tweets to remove stop words and tokenize the tweets using a BERT-based model.
3. From the user-topic set of tweets find tweets that are most similar to the user's tweets and recommend.

Part II
1. Allow user to select one of his tweet and its relevant niche. 
2. Extract and display top 10 most popular tweets in the niche that are also the most similar to the user's tweets.
3. Compare the popularity of user's tweets with the top tweets in niche.
