# The Skeleton Implementation
Setting up the inital infrastructure for such a task can be quite daunting.
Therefore, the following instructions will help you setup the intital services.

The skeleton implementation consists of three main components:
* A Slack Workspace
* Amazon Lex
* Amazon Kendra

**Note:** The Amazon Kendra service, is not supported in all regions. Therefore,
you should select on of the supported regions. We recommd using the **EU
(Ireland) | eu-west-1** region. You have to ensure that the correct region is
used. This can be done as follows:
* **AWS Management Console access:** Select the region in the top right corner
* **Programmatic access:** `export AWS_DEFAULT_REGION=eu-west-1` on the CLI

In the following sections, you will find all the information that is needed to
setup the skeleton implementation. This will be done in the opposite order, than
listed above.

## First Step
The first step is to setup an Amazon Kendra Index. You will find all the
information in the [Amazon Kendra](./skeleton/amazon-kendra.md) section.
