# nexmo API practice 
My playground of coding and demo. On the main page, clicking on the chat icon, a private message will be created between the configured customer_a_number and customer_b_number.The virtual number serves as a proxy to mask the sender numbers, so that neither of the sender will see the other party's mobile number.
The demo is based on nexmo verify API. 

# Run the App Locally

## Prerequisites
* You have registered an Nexmo Account. If not, please kindly go to https://dashboard.nexmo.com/ to register an account.
* Rent a number from Nexmo. A Swedish mobile number is good to be used for Singapore mobile number.
* Download the source from git.

## Prerequisites
Run the following command to install dependencies.

```bash
npm install
```

## Configuring the application

Configure the following in envrionment variables in Windows:

NEXMO_API_KEY='YOUR NEXMO API KEY'

NEXMO_API_SECRET='YOUR NEXMO API SECRET'

NEXMO_CUST_A_NUM ='From Mobile Number'

NEXMO_CUST_B_NUM ='To Mobile Number'

NEXMO_BRAND_NAME='UP TO 11 ALPHANUMERIC CHARACTERS'

VIRTUAL_NUMBER='YOUR Nexmo Vitural Number'

or, you could go to server.js and hardcoded the values.

For how to modify enrionment variables on Windows, please refer to the following :
https://docs.oracle.com/en/database/oracle/r-enterprise/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html

## Running the application
```
 `npm start`.
```
## Use ngrok 
ngrok provides introspectable tunnels to localhost, so that your webhook can be access through Internet.
You need this service for inbound SMS. 

## Configure webhook URL
* Configure the webhook URL at your virtual number configuration page.
* Configure the webhook URL at your nexmo API dashboard. 
 e.g. `https://abcd1234.ngrok.io/webhooks/inbound-sms`
 
 
## Test the Application

1. Open https://<Your ngrok domain>/ from your Chrome or Firefox browser.

2. Click on the "Chat with Driver" button. (a green icon)

3. You will receive a SMS from your virtual number, reply to it, and your the other test mobile number will receive the message, without seeing your actual mobile number.

