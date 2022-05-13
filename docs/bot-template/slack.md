# Setup Slack
Amazon Lex provides an API that can be used to link any application or service
to the bot. Besides that, it also provides predefined integrations into chat and
messaging services. This template uses the [Amazon Lex integration with
Slack](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html).

The following steps are adopted from the [Integrating an Amazon Lex Bot with
Slack](https://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html)
documentation. However, as this documentation is outdated, we describe the steps
here.

In order to setup the Slack integration you have to do the following steps:
1. Create a Slack Workspace or use an existing if you already have one
   * [Create Workspace](https://slack.com/help/articles/206845317-Create-a-Slack-workspace)
   * [Invite new members](https://slack.com/help/articles/201330256-Invite-new-members-to-your-workspace-Invite-new-members-to-your-workspace-Invite-new-members-to-your-workspace)

1. Create a Slack Application
   * [Sign in](http://api.slack.com) to the Slack API Console
   * Click on **Create an app**
   * On the **Create an app** popup, select *From scratch*
   * Give it an **App Name**
   * Select the **Slack Workspace** you want the app to be installed in (e.g.
     the previously created workspace)

2. Configure the Slack application
   * Go to **Interactivity & Shortcuts** on the left menu
     * Activate the **Interactivity** toggle
     * In the **Request URL** add `https://slack.com`

       **NOTE:** This will later be changed to the URL of the Amazon Lex Bot
     * Click *Save Changes* on the bottom
   * Go to **Basic Information** on the left menu
     * Make a note with the following information
       * Client ID
       * Client Secret
       * Verification token

1. Add a **channel** to integrate the Slack Application with the Amazon Lex Bot
   * Go to the [Amazon Lex AWS
   * Console](https://eu-west-1.console.aws.amazon.com/lexv2/home#bots) and open
     the Lex Bot you created in the previous step
   * Select **Channel integrations** from the menu on the left
   * Click **Add channel**
   * Platform section
     * Select **Slack**
   * Integration section
     * Give it a **Name**
     * Select *TestBotAlias* as a **Alias**
     * Select *English (US)* as the **Language**
   * Additional configuration section
     * Copy-and-Paste the *Client ID*, *Client Secret* and *Verification token*
       from the previous step
   * Click *Create*
   * Save the following information from the **Callback URL** section
     * *Endpoint*
     * *OAuth endpoint*

1. Finish setting up the Slack Application
   * Go back to the [Slack App Web-UI](https://api.slack.com/apps)
   * Select the app you created before
   * Go to **OAuth & Permissions** on the left menu
     * In the **Redirect URLs** section, add the *OAuth endpoint* you copied in
       the last step
     * Click on *Save URLs*
     * In the **Scopes** section, add the following scopes to the **Bot Token
       Scopes** by clicking on *Add an OAuth Scope*:
       * `chat:write`
       * `team:read`
     * These changes are saved automatically
   * Go to **Interactivity & Shortcuts** on the left menu
     * Update the **Request URL** with the *Endpoint* you copied in the last
       step
     * Click *Save Changes* on the bottom
   * Go to **Event Subscriptions** on the left menu
     * Enable the feature
     * Add the *Endpoint* you copied to the **Request URL**
     * In the **Subscribe to bot events** add the following Bot User Events:
       * `message.im`
     * Click *Save Changes* on the bottom
   * Go to **App Home** on the left menu
     * Activate *Allow users to send Slash commands and messages from the
       messages tab*
   * Go to **Manage Distribution** on the left menu
     * Click on **Add to Slack**
     * You are asked to give the app permissions to access the workspace. Click
       on *Allow*

1. Test the Integration
   * After the previous step the bot is available in your Slack workspace
   * You can interact with the bot via **Direct messages**. If you don't see the
     bot in the Direct messages section, you can add it with the '+' sign
   * Send the following messages, to test the integration
     * Hello Data Days 2022
     * Why do I need travel protection?

You have now successfully setup the Q&A Bot Template. Congrats 🚀
