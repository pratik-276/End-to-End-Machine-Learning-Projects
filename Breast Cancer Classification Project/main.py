import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import time
from sklearn import preprocessing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import plot_confusion_matrix
plt.rcParams['figure.figsize'] = 8, 5
plt.style.use("fivethirtyeight")
pd.options.plotting.backend = "plotly"
data = pd.read_csv('data.csv')

st.title('Breast Cancer Classification Project')
st.write('''Cancer occurs when changes called mutations take place in genes that regulate cell growth. The mutations let the cells divide and multiply in an uncontrolled way.
\n
Breast cancer is cancer that develops in breast cells. Typically, the cancer forms in either the lobules or the ducts of the breast. Lobules are the glands that produce milk, and ducts are the pathways that bring the milk from the glands to the nipple. Cancer can also occur in the fatty tissue or the fibrous connective tissue within your breast.
\n
The uncontrolled cancer cells often invade other healthy breast tissue and can travel to the lymph nodes under the arms. The lymph nodes are a primary pathway that help the cancer cells move to other parts of the body. Source.''')

st.write('\nDataset for this project is collected from https://www.kaggle.com/uciml/breast-cancer-wisconsin-data\n\n')

#DESCRIPTION
st.markdown('## Description of Data')
st.dataframe(data.describe())
st.write('\n\n')
st.markdown('## Correlation in the Data')
sns.heatmap(data.corr())
st.pyplot()

#MISSING VALUES
st.markdown('## Missing Values Plot')
fig = data.isnull().sum().reset_index().plot(kind='bar', x=0, y='index')
fig.update_layout(xaxis_title='Columns', yaxis_title='Missing Count')
st.plotly_chart(fig)
st.write('The variables id and Unnamed: 32 will be dropped')
drop_var = ['Unnamed: 32', 'id']
data.drop(drop_var, axis=1, inplace=True)

#PLOTS
st.markdown('## Distribution of Variables')
features = ['radius','perimeter','compactness','concave points','fractal_dimension']
j = 0
for feature in features:
    if j%2==0:
        sns.boxplot(data=data[['{}_mean'.format(feature), '{}_se'.format(feature), '{}_worst'.format(feature)]])
    else:
        sns.FacetGrid(data, hue="diagnosis", height=6,).map(sns.kdeplot, "{}_mean".format(feature),shade=True).add_legend()
    plt.title('Distribution of {}'.format(feature))
    j+=1
    st.pyplot()
st.markdown('## Pairplot')
sns.pairplot(data=data[['diagnosis','area_mean','texture_mean','smoothness_mean','concavity_mean','symmetry_mean']], hue="diagnosis", height=3, diag_kind="hist")
st.pyplot()
st.write('''From the above box plots it can be very well noticed that there are many outliers in the dataset. One thing to consider
 here is that I only have 569 data points to train my classification model on and if I drop more data
 then rather than cleaning it can become an issue of data loss. So I am not dropping any of the
 rows from the data.''')

st.markdown('## Target variable distribution')
fig = data['diagnosis'].value_counts().reset_index().plot(kind='bar',x='index',y='diagnosis',color='diagnosis')
fig.update_layout(xaxis_title='Diagnosis', yaxis_title='')
st.plotly_chart(fig)

#CLASSIFICATION
st.markdown('## Classification Model')
with st.echo():
    #separating features and labels

    X = data.drop('diagnosis',axis=1)
    y = data['diagnosis']

with st.echo():
    #scaling the data

    X_scaled = preprocessing.scale(X)

with st.echo():
    #splitting the data

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3)

with st.echo():
    #creating model and fitting the data

    model = LogisticRegression()
    model.fit(X_train, y_train)

with st.echo():
    #checking the cross val score

    scores = cross_val_score(model, X_scaled, y, cv=5)
    st.write('Cross Val Score for logistic regression is',np.mean(scores))

with st.echo():
    #prediction

    pred = model.predict(X_test)

with st.echo():
    #checking the confusion matrix

    plot_confusion_matrix(model, X_test, y_test)
    st.pyplot()

with st.echo():
    #checking roc curve

    from sklearn.metrics import roc_curve
    model = LogisticRegression()
    model.fit(X_train, y_train)
    y_pred_prob = model.predict_proba(X_test)[:,1]
    fpr, tpr, thresholds = roc_curve(y_test, y_pred_prob, pos_label='M')
    plt.plot([0, 1], [0, 1], 'k--')
    plt.plot(fpr, tpr, label='Logistic Regression')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Logistic Regression ROC Curve')
    st.pyplot()

st.markdown('## Accuracy: 98%')
st.write('''The model seems to be getting overfitted from the accuracy score, but the confusion
matrix and the roc curve tells that it is not. Also the dataset is balanced, so overfitting is
not expected.''')

st.markdown("** A live classification model could have been made using the above model but this model requires 30 input fields and will not be feasible for anyone to use. So I didn't make up any live form or model. **")
