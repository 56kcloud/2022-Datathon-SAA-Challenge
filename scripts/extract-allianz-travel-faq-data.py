import string
from bs4 import BeautifulSoup
from urllib.request import urlopen
import pandas as pd
import json

url = "https://www.allianz-travel.ch/en_CH/services/faq.html"

page = urlopen(url)
html_bytes = page.read()
html = html_bytes.decode("utf-8")

soup = BeautifulSoup(html, "html.parser")

dataset = []

for e in soup.find_all("div", class_="c-accordion__item-wrapper"):
    question_span = e.find_all("span", class_="c-accordion__item-title")
    answer_div = e.find_all("div", class_="c-copy u-text-hyphen-manual")
    if len(answer_div) == 0:
        answer_div = e.find_all("div", class_="c-accordion__item-text")

    quesiton = question_span[0].get_text()
    answer = answer_div[0].get_text()

    quesiton = quesiton.strip()
    answer = answer.strip()

    dataset.append({
        "question": quesiton,
        "answer": answer
    })

with open('../dataset/allianz-travel-faq.json', 'w') as f:
    json.dump(dataset, f, indent=2)
