# Travelling in Covid-19 times: The Q&A Bot on travel insurance

![Challenge Logo](./docs/images/challenge-logo.png)

The [Swiss Association of Actuaries (SAA)](https://www.actuaries.ch/) is a Gold
Sponsor of the [Data Days 2022](https://datadays.ch). As part of this sponsoring
a challenge is proposed to let the participants work on an impactful task within
the insurance industry.

This repository contains all the material that is needed in order for you to
work on the challenge. Further down, you can find more information about the structure of the repository.

## Help insurers make your travels fun again!
Are you planning your next vacation yet? Due to the Covid pandemic, people are
more interested in travel insurance. But how can they find what the coverage
includes? Your task is to improve the customer experience of finding the needed
information. As well as, to enhance the ability of insurers to deliver the right
answers to their customers. Natural Language Processing (NLP) is used to solve
this business problem. This challenge from the Swiss Association of Actuaries
(SAA) provides a Q&A Bot template. That uses the latest Amazon Web Services
(AWS) tools and a real-world FAQ dataset. Do you want to help make insurance
more transparent? Do you want to have more convenient travel planning? Then sign
up for the SAA Q&A Bot Challenge.

# Repository Structure
The structure of this repository is as follows:
## **docs** folder
This folder contains the documentation and instructions on how to get started
with the challenge

  * [Challenge Description](./docs/Challenge-description.md)
  * [AWS Account Creation](./docs/Aws-Account.md)
  * [Skeleton Implementation](./docs/Skeleton-Implementation.md)

## **dataset** folder
The skeleton implementation is built upon the [Allianz Travel
FAQ](https://www.allianz-travel.ch/en_CH/services/faq.html). In the dataset folder you will find the english and german version of the dataset. Both in a `json` version that is compatible with the Amazon Kendra FAQ model. And the prettified html version.

TODO: Add german html

## **scripts** folder
Contains helper scripts that were used to extract the dataset from the website.

## **kendrasamples-react-app**
TODO: will this stay here???
