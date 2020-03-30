# nexmo API practice 
My playground of coding and demo. On the main page, clicking on the chat icon, a private message will be created between the configured customer_a_number and customer_b_number.The virtual number serves as a proxy to mask the sender numbers, so that neither of the sender will see the other party's mobile number.
The demo is based on nexmo verify API. 

# Deploy to Heroku

## Step 1: 

Click the following button to deploy the source to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/kopi-kosong/nexmo-sms-api.git)

## Step 2: 

Click on your Application, and Go to "Settings - > Config Vars" to add the following environment variables:

NEXMO_API_KEY=<YOUR NEXMO API KEY>
NEXMO_API_SECRET=<YOUR NEXMO API SECRET>
NEXMO_CUST_A_NUM =<From Mobile Number>
NEXMO_CUST_B_NUM =<To Mobile Number>
NEXMO_BRAND_NAME=<UP TO 11 ALPHANUMERIC CHARACTERS>
VIRTUAL_NUMBER=<YOUR Nexmo Vitural Number >

# Run it locally

## Prerequisites
Download the source from git.

Run the following command to install dependencies.

```bash
npm install
```

## Configuring the application

Configure the following in envrionment variables in Windows:

NEXMO_API_KEY=<YOUR NEXMO API KEY>

NEXMO_API_SECRET=<YOUR NEXMO API SECRET>

NEXMO_CUST_A_NUM =<From Mobile Number>

NEXMO_CUST_B_NUM =<To Mobile Number>

NEXMO_BRAND_NAME=<UP TO 11 ALPHANUMERIC CHARACTERS>

VIRTUAL_NUMBER=<YOUR Nexmo Vitural Number >

or, you could go to server.js and hardcoded the values.

For how to modify enrionment variables on Windows, please refer to the following :
https://docs.oracle.com/en/database/oracle/r-enterprise/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html

```
## Running the application
You should then be able to run the app with `npm start`.
