from bs4 import BeautifulSoup
import json
import requests

url = "https://www.allianztravelinsurance.com/covid-19-faq.htm"

r = requests.get(url)
encoding = r.encoding if 'charset' in r.headers.get(
    'content-type', '').lower() else "utf-8"
parser = "html.parser"

soup = BeautifulSoup(r.content, parser, from_encoding=encoding)

dataset = []

questions_div = soup.find("div", class_="questions")

for e in questions_div.find_all("ul", {"class": ["category1", "category2"]}):
    # Get the question and the answer
    question_li = e.find("li", class_="quest")
    answer_li = e.find("li", class_="ans")
    question = question_li.get_text()
    answer = answer_li.get_text()

    # Make some data cleaning
    question = question.replace("+-", "")
    answer = answer.replace("+-", "")
    question = question.strip()
    answer = answer.strip()

    dataset.append({
        "Question": question,
        "Answer": answer
    })

jsonFile = {
    "SchemaVersion": 1,
    "FaqDocuments": dataset
}

with open('../dataset/allianz-us-travel-faq-kendra.json', 'w') as f:
    json.dump(jsonFile, f, indent=2)

with open('../dataset/COVID-19 FAQs | Allianz Global Assistance.html', 'w') as f:
    f.write(soup.prettify())
