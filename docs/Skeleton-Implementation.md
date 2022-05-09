# The Skeleton Implementation
Setting up the inital infrastructure for such a task can be quite daunting.
Therefore, the following instructions will help you setup the intital services.

The skeleton implementation consists of three main components:
* A Slack Workspace
* Amazon Lex
* Amazon Kendra

**Note:** The Amazon Kendra service, is not supported in all regions. Therefore,
*you should select on of the supported regions. We recommd using the **EU
*(Ireland) | eu-west-1** region. You have to ensure that the correct region is used. This can be done as follows:
* **AWS Management Console access:** Select the region in the top right corner
* **Programmatic access:** `export AWS_DEFAULT_REGION=eu-west-1` on the CLI

For each of the three components, you will find the information on how to configure them below.

## Amazon Kendra
[Amazon Kendra](https://aws.amazon.com/kendra/) is an intelligent search service
powered by Machine Learning (ML). In this template implementation we use the
Kendra FAQ feature. This allows us to search the Allianz Travel FAQs.

You can find more information about Kendra in the
[documentation](https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html).

## Amazon Lex
[Amazon Lex](https://aws.amazon.com/lex/) is an AI powered Chat bot service.
This allows us to make the FAQs available via chat.

You can find more information about Lex in the
[documentation](https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html).

## Slack
To simply test the default Q&A Bot implementation, you can use the [Amazon Lex
integration with
Slack](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html). In
order to setup the Slack integration you have to do the following steps:
1. [Create a Slack Workspace](https://slack.com/help/articles/206845317-Create-a-Slack-workspace) or use an existing
1. [Create a Slack Application](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-assoc-create-app.html)
1. [Integrate the Slack Application with the Amazon Lex Bot](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-assoc-create-assoc.html)
1. [Complete Slack Integration](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-back-in-slack-console.html)
1. [Test the Integration](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-test.html)

## The tasks
### Extract data from a website
The data used for the example can be found here:
https://www.allianz-travel.ch/en_CH/services/faq.html

### Import the data into an analytics tool


### Do some fancy analytics, ml, ...


### Give the user access to the data using a simple to use UI
* https://docs.aws.amazon.com/kendra/latest/dg/deploying.html
  `docker run --rm -it -p 3000:3000 -v ${PWD}:/home/node/app node:12 bash`
* https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html


## Further examples
* [Create a Question and Answer Bot with Amazon Lex and Amazon Alexa](https://aws.amazon.com/blogs/machine-learning/creating-a-question-and-answer-bot-with-amazon-lex-and-amazon-alexa/)
