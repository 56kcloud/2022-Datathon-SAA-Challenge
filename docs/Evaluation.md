# Evaluation
At the end of the Datathon a Jury will evaluate all the submissions. The
submissions will be evaluated on a quantitative and qualitative level. You will
find more information about the quantitative evaluation below.

For this challenge the following evaluation criteria apply:
* Quantitative Scoring of Q&A Bot Answers

  Predefined questions have to be answered by the bot. The answers will then be
  compared to the example answers using well known techniques.
* Qualitative Scoring of the Q&A Bot Answers

  The Jury asks the bot 5 predefined questions and will evaluate them with
  respect to their usefulness from a customer perspective
* Quality of the pitch

  Assessment of the pitch with respect to story telling, promotion of the
  solution/approach, appeal of presentation
* Creativity as well as range and depth of the solution

  How creative are the features and how well do they align to the overall story?
  As well as the amount and depth of the features

## Details for Qualitative Scoring
To also give a qualitative aspect to the scoring, the jury will ask the bot
predefined questions. The answers will be scored based on well established
metrics. You can find the script that will be used
[here](./../scripts/quantitative-evaluation.py).

### How will we do the qualitative Scoring?
During the Datathon, we will visit each team and connect a Slack Application to
their bot. After the submission deadline, we will then use that app to ask the
predefined questions. The provided answers will then be used to calculate the
quantitative and qualitative score.

### Dataset
The quantitative score will be based on the information provided in the following datasets:
* [Travel Insurance FAQs | Allianz Global Assistance](https://www.allianztravelinsurance.com/faq.htm)
* [COVID-19 FAQs | Allianz Global Assistance](https://www.allianztravelinsurance.com/covid-19-faq.htm)
* [General Terms and Conditions (GTC) - Allianz Travel Switzerland](https://www.allianz-travel.ch/en_CH/services/download-center.html)

You can find all of these datasets in the [dataset folder](./../dataset/) of the
root directory of this repository.

The questions that will be asked, are a combination of different difficulty
levels. These contain simple questions with answers provided in single data
source. Non-trivial questions with the information from one data source.
Questions that can only be answered by combining the information from multiple
data sources.

### Q&A Examples
* What is included in non-refundable trip costs?

  Non-refundable costs include pre-paid trip deposits/payments that would be
  lost if you had to cancel for a covered reason prior to trip departure. Some
  examples may include vacation rental costs, campground fees; rental car fees;
  tickets for tours or events; and hotel and airline ticket costs. Be sure to
  consult your travel suppliers to determine which costs are non-refundable for
  your particular trip, as cancellation policies vary.

* What do I have to do before I book a trip?

  Before you book, and before you travel, use our interactive map to see current
  information on travel requirements and entry restrictions for international
  destinations, including COVID-19 testing, vaccination policies, necessary
  travel documents and quarantine periods. (Content is provided by Sherpa, an
  affiliated third party).

* My partner is sick. We are not married. Are we covered?

  No, unmarried partners are not covered.
