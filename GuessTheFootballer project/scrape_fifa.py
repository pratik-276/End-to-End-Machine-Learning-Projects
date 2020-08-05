import pandas as pd
import re
import requests
from bs4 import BeautifulSoup

base_url = "https://sofifa.com/players?offset="
columns = ['ID', 'Name', 'Age', 'Photo', 'Nationality', 'Flag', 'Overall', 'Potential', 'Club', 'Club Logo', 'Value', 'Wage', 'Special']
data = pd.DataFrame(columns = columns)

for offset in range(0, 300):
    url = base_url + str(offset * 61)
    source_code = requests.get(url)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text, 'html.parser')
    table_body = soup.find('tbody')
    for row in table_body.findAll('tr'):
        td = row.findAll('td')
        picture = td[0].find('img').get('data-src')
        pid = td[0].find('img').get('id')
        nationality = td[1].findAll('a')[0].find('div').find('img').get('title')
        flag_img = td[1].find('img').get('data-src')
        name = td[1].findAll('a')[0].get('data-tooltip')
        age = td[2].text.strip()
        overall = td[3].text.strip()
        potential = td[4].text.strip()
        club = td[5].find('a').text
        club_logo = td[5].find('img').get('data-src')
        value = td[6].text.strip()
        wage = td[7].text.strip()
        special = td[8].text.strip()
        player_data = pd.DataFrame([[pid, name, age, picture, nationality, flag_img, overall, potential, club, club_logo, value, wage, special]])
        player_data.columns = columns
        data = data.append(player_data, ignore_index=True)
data = data.drop_duplicates()

data.to_csv('data.csv', index=False)
