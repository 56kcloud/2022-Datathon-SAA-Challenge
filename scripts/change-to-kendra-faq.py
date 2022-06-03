import string
from bs4 import BeautifulSoup
from urllib.request import urlopen
import pandas as pd
import json

file = open('allianz-travel-faq-cleaned.json', 'r')
input = json.load(file)

dataset = []

for e in input:
    dataset.append({
        "Question": e["question"],
        "Answer": e["answer"]
    })

jsonFile = {
    "SchemaVersion": 1,
    "FaqDocuments": dataset
}

with open('../dataset/allianz-travel-faq-kendra.json', 'w') as f:
    json.dump(jsonFile, f, indent=2)

file.close()
