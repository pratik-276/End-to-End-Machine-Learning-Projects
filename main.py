from flask import Flask, render_template, url_for, request
import numpy as np
from sklearn.externals import joblib
app = Flask(__name__)

filename = './data/model.sav'
model = joblib.load(filename)

def find_species(a,b,c,d):
	return model.predict(np.array([a,b,c,d]).reshape(1,-1))[0]

@app.route("/")
@app.route("/index.html")
def first_index():
	return render_template('index.html', data=' ')

@app.route("/", methods=['POST'])
def second_index():
	sepall = request.form['sepall']
	sepalw = request.form['sepalw']
	petall = request.form['petall']
	petalw = request.form['petalw']
	species = find_species(sepall, sepalw, petall, petalw)
	return render_template('index.html', data=species)
