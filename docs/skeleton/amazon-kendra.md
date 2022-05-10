# Amazon Kendra
[Amazon Kendra](https://aws.amazon.com/kendra/) is an intelligent search service
powered by Machine Learning (ML). In this template implementation we use the
Kendra FAQ feature. This allows us to search the Allianz Travel FAQs.

You can find more information about Kendra in the
[documentation](https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html).

## Setup

### Create S3 Bucket
To upload the FAQs into Kendra, you need to upload them to an S3 bucket. This
can be done with the following steps:
1. Go to the [Amazon S3 Service Console](https://s3.console.aws.amazon.com/s3/buckets?region=eu-west-1)
1. Create a new Bucket
   * Give it a **Bucket Name**. The name has to be globally unique.
   * Select **EU (Ireland) eu-west-1** as the AWS Region
   * The rest of the settings can be left to default
1. Upload the FAQ datasets
   * Go to the newly created bucket
   * Click on the **Upload** Button
   * Upload the `.json` files from the `dataset` folder

### Create the Kendra Index
After uploading the FAQ datasets, we need to create the Amazon Kendra Service.
1. Go to the [Amazon Kendra Service
   Console](https://eu-west-1.console.aws.amazon.com/kendra/home?region=eu-west-1#indexes)
1. Create a new index
   * Give it a **Index Name**
   * Create a new **IAM Role**
2. No special **user access control** needs to be configured
3. Select the **Developer Edition** for the **Provisioning editions** in the
last step

After the successful creation of the index, you get redirected to the index home
page. The last step on the Kendra configuration is then to add the FAQs. You
have to repeat this step for both datasets:
* `allianz-travel-faq-de-kendra.json`
* `allianz-travel-faq-en-kendra.json`

While adding the FAQ please make sure to select the correct language for the
file you have selected.
1. Click on the **FAQs** menu link on the left side
1. Select **Add FAQ**
   * Give it a **FAQ name**. Prepend it with *-en* (or something similar), as
     you also have to add another language
  * Select the **Default Language** (e.g. *English (en)*)
  * The **FAQ file format** is *JSON file*
  * **Browse S3** and select the dataset matching the language you selected
    above
  * Create a new **IAM role**
1. Click **Add** and wait until you get redirected to the FAQ overview page

Creating the FAQs can take some time. You don't have to wait until they are
*Active* and can proceed to the next step.

## Next Step: Create Amazon Lex Bot
Now that we have the FAQs indexed in Amazon Kendra, we need to create the Amazon
Lex Bot and connect it to the FAQs. You will find the steps in the [Amazon
Lex](./amazon-lex.md) section.
