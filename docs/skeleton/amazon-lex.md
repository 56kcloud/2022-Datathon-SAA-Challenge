# Amazon Lex
[Amazon Lex](https://aws.amazon.com/lex/) is an AI powered Chat bot service.
This allows us to make the FAQs available via chat.

You can find more information about Lex in the
[documentation](https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html).

## Setup
After you have successfully added the Kendra index, you can head over to the
[Amazon Lex Console
Service](https://eu-west-1.console.aws.amazon.com/lexv2/home?region=eu-west-1#bots).
Here the first step is to create a bot. Please ensure that you are on the **Lex
V2 console**, which should already be the default.

## Create the bot
1. Click on *Create bot*
1. *Configure bot settings* step
   * Select **Create a blank bot**
   * Give it a **Bot Name**
   * Select **Create a role with basic Amazon Lex permissions** in the **IAM
     permissions** section
   * Select **No** in the **Children’s Online Privacy Protection Act (COPPA)**
     section
1. *Add languages* step
   * Add *English (US)* as a language
   * Add *German (DE)* as a language
   * Click on *Done*

After the successful creation of the Bot, you get redirected to the *Intent*
section of the *English (US)* language. Here you can add a new Intent. We have
to create two intents, one default and one for the Kendra integration.

### Create default intent
In Lex V2 you need to have at least one intent with a *utterance*, the so called
default intent. You can use the UI to which you are redirected to create this
default intent.
1. Intent details
   * Change the **Intent name**: DefaultIntent
1. Sample utterances
   * **Add utterance**: "Hello Data Days 2022"
1. Closing responses
   * Message: "Happy to see you participating in the SAA Q&A Bot Challenge"
1. Click on **Save intent** on the bottom
1. Click on **Build** on the bottom
1. *Optional:* After the build succeeded, you can test the bot with the **Test**
   button on the bottom

### Link Bot to Kendra
After you have successfully created the default intent, we link the *English
(US)* language to the Kendra index.

1. Go to the **Intents** overview page
1. Click **Add intent** and select *Use built-in intent*
   * **Built-in intent**: Select *AMAZON.KendraSearchIntent*
   * Give it an **Intent name**
   * Select the previously created Kendra index from the drop-down
1. You get redirected to the newly created Intent
1. Closing responses
   * Add the following text as the **Message**
     * I found a FAQ question for you: ((x-amz-lex:kendra-search-response-question_answer-question-1)), and the answer is ((x-amz-lex:kendra-search-response-question_answer-answer-1))
   * Add the following two lines as **Variations**
     * I found an excerpt from a helpful document: ((x-amz-lex:kendra-search-response-document-1))
     * I think the answer to your questions is ((x-amz-lex:kendra-search-response-answer-1))
1. Click on **Save intent** on the bottom
1. Click on **Build** on the bottom
1. *Optional:* After the build succeeded, you can test the bot with the **Test**
   button on the bottom
   * Sent *Travel Hotline* to the bot

Now you have successfully created an Amazon Lex bot and connected it to the
previously created Kendra index.

## Next Step: Connect Amazon to Slack
The last step is to connect Amazon Lex to Slack. To set this up head over to
[Connect Slack](./slack.md).
