# Setup Slack
To test the default Q&A Bot implementation, you can use the [Amazon Lex
integration with
Slack](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html).

In contrast to the previous to sections, you are linked to existing
documentations for the single steps. However, you will find some additional
pointers, to clarify the steps you need to perform.

In order to setup the Slack integration you have to do the following steps:
1. [Create a Slack
Workspace](https://slack.com/help/articles/206845317-Create-a-Slack-workspace)
   or use an existing if you already have one
1. [Create a Slack Application](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-assoc-create-app.html)
   * On the **Create an app** popup, select *From scratch*
   * Select the **Slack Workspace** you have just created
1. [Integrate the Slack Application with the Amazon Lex Bot](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-assoc-create-assoc.html)
   * Go to the AWS Console and open the Lex Bot you created in the previous step
   * Select **Channel integrations** from the menu on the left
   * Click **Add channel**
   * Platform section
     * Select **Slack**
   * Integration section
     * Give it a **Name**
     * Select *TestBotAlias* as a **Alias**
     * Select *English (US)* as the **Language**
   * Additional configuration section
     * Copy the information from the Slack app into the corresponding fields

1. [Complete Slack Integration](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-back-in-slack-console.html)
1. [Test the Integration](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-test.html)
   * To test the Slack integration you can send the same messages you tested
     before
     * Hello Data Days 2022
     * Travel Hotline

You have now successfully setup the Q&A Bot Template. Congrats 🚀
