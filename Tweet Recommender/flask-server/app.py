from posts import get_posts, getPopularPost
from userpost import getuserpost
from flask import Flask, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/get-posts')
def hello_world():
    user_name = request.args.get('user_name')
    topics = request.args.get('topics')
    
    return get_posts(user_name, topics)


@app.route('/get-posts-by-user')
def hello_world1():
    user_name = request.args.get('user_name')
    
    return getuserpost(user_name)



@app.route('/get-popular-posts')
def hello_world2():
    t_id = request.args.get('t_id')
    username = request.args.get('username')
    user_topic = request.args.get('topic')
    
    return getPopularPost(t_id, username, user_topic)