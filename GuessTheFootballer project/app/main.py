from flask import Flask, render_template, url_for, request
import pandas as pd
import random
from scipy.spatial import distance
app = Flask(__name__)

def value(value):
    value = value.replace('€','')
    if 'M' in value:
        value = float(value.replace('M',''))
        value = value*1000000
    elif 'K' in value:
        value = float(value.replace('K',''))
        value = value*1000
    return value

def wage(wage):
    wage = wage.replace('€','')
    if 'K' in wage:
        wage = float(wage.replace('K',''))
        wage = wage*1000
    return wage

def cleaner(data):
    data = data[['Age','Overall', 'Potential', 'Value', 'Wage']].copy()
    data['Value'] = data['Value'].apply(value)
    data['Value'] = data['Value'].astype('float')
    data['Wage'] = data['Wage'].apply(wage)
    data['Wage'] = data['Wage'].astype('float')
    data['Age'] = data['Age'].astype('int')
    data['Overall'] = data['Overall'].astype('int')
    data['Potential'] = data['Potential'].astype('int')
    return data

def get_five_similar(data, id1):
    df = cleaner(data)
    selected = df.loc[id1].tolist()
    scores = []
    for i in range(df.shape[0]):
        lst = df.loc[i, ['Age','Overall', 'Potential', 'Value', 'Wage']].tolist()
        scores.append(distance.cosine(selected, lst))
    df['relation'] = pd.Series(scores)
    df = df.sort_values('relation', ascending=True).reset_index().loc[1:5]
    return df['index'].tolist()

def six_ids():
    data = pd.read_csv('https://raw.githubusercontent.com/pratik-276/Machine_Learning_Projects/master/Creating%20a%20Kaggle%20Workflow/data.csv')
    df = data[data['Potential']>85].reset_index(drop=True)
    player_index = random.randint(0,df.shape[0]-1)
    five_ids = get_five_similar(data, player_index)
    all_ids = five_ids + [player_index]
    return all_ids

@app.route("/")
@app.route("/index.html")
def first_index():
	return render_template('index.html')

@app.route("/game.html")
def game():
    #ids = six_ids()
    ids = [0,1,2,3,4,5]
    actual = ids
    main_id = ids[-1]
    data = pd.read_csv('https://raw.githubusercontent.com/pratik-276/Machine_Learning_Projects/master/Creating%20a%20Kaggle%20Workflow/data.csv')
    data = data.loc[ids]
    ids = random.sample(ids, len(ids))
    dicty = {}
    dicty['pass'] = dict(data)
    dicty['ids'] = ids
    dicty['main'] = main_id
    dicty['actual'] = actual
    return render_template('game.html', dict=dicty)
