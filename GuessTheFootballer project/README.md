## GuessTheFootballer

<p align="center"><img src="https://github.com/pratik-276/End-to-End-Machine-Learning-Projects/blob/master/GuessTheFootballer%20project/app/static/4.PNG" height="200" width="300"></p>

## Introduction

This is Web App based Game powered by <b>Machine Learning and Flask</b> that provides multiple player images who payed in <b>FIFA 2020</b> and asks to the correct player based on certain hints. Various points are assigned based on at what hint the user gave the correct answer. Other rules of the game are mentioned in the home page. Do read them.

## Data Collection

The dataset used in this project is scraped from <a href="https://sofifa.com/">https://sofifa.com/</a>
I have added the scraping python script. Run the following code to create the dataset on your own system.
```sh
python scrape_fifa.py
```

## Technology Used

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JS</li>
  <li>Flask</li>
  <li>Pandas</li>
  <li>Sklearn</li>
  <li>Heroku</li>
</ul>

## Installation

1. Drop a ⭐ on the Github Repository.
2. Download the repo as a zip file or clone it using the following command
```sh
https://github.com/pratik-276/End-to-End-Machine-Learning-Projects.git
```

3. Move inside the ` /GuessTheFootballer Project ` folder and open CLI in that folder

4. Install the required libraries by the following command
```sh
pip install -r requirements.txt
```

5. Run the following commands in the command line to get your flask app started
```sh
set FLASK_APP=main.py
flask run
```

6. Go to `http://127.0.0.1:5000/` and check out the flask app.

## Deployed Version

This game is already deployed on heroku and can be found on <a href="https://guessthefootballer.herokuapp.com/">https://guessthefootballer.herokuapp.com/</a>

## Contents

1. Code to scrape the data
2. Rules of the game
<img src="https://github.com/pratik-276/End-to-End-Machine-Learning-Projects/blob/master/GuessTheFootballer%20project/app/static/1.PNG">
3. Hints in the game
<img src="https://github.com/pratik-276/End-to-End-Machine-Learning-Projects/blob/master/GuessTheFootballer%20project/app/static/2.PNG">
4. Points assigned on correct answer
<img src="https://github.com/pratik-276/End-to-End-Machine-Learning-Projects/blob/master/GuessTheFootballer%20project/app/static/3.PNG">

## Motivation

Got my motivation to create the project while analyzing a dataset on Kaggle on FIFA 19 players.
You can check that kernel here: <a href="https://www.kaggle.com/pratik1120/fifa-eda-visualization-and-clustering">https://www.kaggle.com/pratik1120/fifa-eda-visualization-and-clustering</a>

## Conclusion

This project is made in the way of a fun game that can be played by anyone. If you are interested in modifying it, feel free to download the code and change it.
