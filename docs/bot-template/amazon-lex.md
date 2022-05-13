# Setup Amazon Lex
[Amazon Lex](https://aws.amazon.com/lex/) is an AI powered Chat bot service.
You use it in this deployment to make the FAQs available via chat.

You can find more information about Amazon Lex in the
[documentation](https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html).

To get familiar with the core concepts and terminology of Amazon Lex, you can
read the [How it
works](https://docs.aws.amazon.com/lexv2/latest/dg/how-it-works.html) section of
the documentation.

## Setup
The first step is to head over to the [Amazon Lex Console
Service](https://eu-west-1.console.aws.amazon.com/lexv2/home?region=eu-west-1#bots).
On there, you can create a bot. Please ensure that you are on the **Lex V2
console**.

### Create the bot
1. Click on *Create bot*
1. *Configure bot settings*
   * Select **Create a blank bot**
   * Give it a **Bot Name**
   * Select **Create a role with basic Amazon Lex permissions** in the **IAM
     permissions** section
   * Select **No** in the **Children’s Online Privacy Protection Act (COPPA)**
     section
1. *Add languages*
   * Add *English (US)* as a language
   * Add *German (DE)* as a language

After the successful creation of the Bot, you get redirected to the *Intent*
section of the *English (US)* language. Here you can add a new Intent. We have
to create two intents, the default and one for the Kendra integration.

### Create default intent
In Lex V2 you need to have at least one intent with a *utterance*, the so called
default intent. You can use the UI to which you were redirected to create this
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

As soon, as you have linked the bot to Slack, you can use *Hello Data Days 2022"
as your first message to the bot.

### Link Bot to Kendra
After you have successfully created the default intent, you create a new intent to link to the Kendra index.

**NOTE:** The *built-in intent* only supports *English (US)* as a language. So
please make sure that you have the correct language selected. And also that the
FAQs in Kendra have the correct language.

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
   * Sent *Why do I need travel protection?* to the bot

Now you have successfully created an Amazon Lex bot and connected it to the
a Kendra index.

## Next Step: Connect Amazon to Slack
The last step is to connect Amazon Lex to Slack. To set this up head over to the
[Setup Slack section](./slack.md).
