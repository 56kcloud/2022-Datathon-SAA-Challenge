import string
from bs4 import BeautifulSoup
from urllib.request import urlopen
import pandas as pd
import json

# DE: https://www.allianz-travel.ch/de_CH/services/faq.html
# EN: https://www.allianz-travel.ch/en_CH/services/faq.html
# FR: https://www.allianz-travel.ch/fr_CH/services/faq.html
# IT: https://www.allianz-travel.ch/it_CH/services/faq.html

lang = "de"  # "en", "fr", "it"
url = "https://www.allianz-travel.ch/" + lang + "_CH/services/faq.html"

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
        "Question": quesiton,
        "Answer": answer
    })

jsonFile = {
    "SchemaVersion": 1,
    "FaqDocuments": dataset
}

with open('../dataset/allianz-travel-faq-' + lang + '-kendra.json', 'w') as f:
    json.dump(jsonFile, f, indent=2)