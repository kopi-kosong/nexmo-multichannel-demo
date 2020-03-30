//require('dotenv').config();
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const SmsProxy = require('./SmsProxy');
const app = express();

app.use(bodyParser.urlencoded({extended:true})) ;
var path=require('path');
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json());

const FROM_NUM = process.env.NEXMO_CUST_A_NUM;
const TO_NUM = process.env.NEXMO_CUST_B_NUM;

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('SMS Proxy App listening on port', app.get('port'));
});

const smsProxy = new SmsProxy();

app.get('/', (req, res) => {
   	//console.log("method: get '/' : [param] - session.user : " + req.session.user);
	res.sendFile('/main.html', { root: __dirname }) ;
})

// Handle and route incoming SMS to virtual numbers
app.post('/webhooks/inbound-sms', (req, res) => {

    console.log("coming in webhook!!");
  
    const from = req.body.msisdn;
    const to = req.body.to;
    const text = req.body.text;
    console.log("req.body.msisdn" + req.body.msisdn);
    console.log("req.body.to" + req.body.to);
    console.log("text" + req.body.text);
    // Route virtual number to real number
    smsProxy.proxySms(from, text);

    res.sendStatus(204);
});



//Added by George

//Ended



// Start a chat
app.post('/chat', (req, res) => {
	
	 console.log("Come in Chat");
	
    const userANumber = FROM_NUM;
    const userBNumber = TO_NUM;
	
    console.log(`userANumber from req`+req.body.userANumber);   
    console.log(`userBNumber from req`+req.body.userBNumber);   
	

    smsProxy.createChat(userANumber, userBNumber, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(result);
        }
    });
	
    //res.send('OK');
	res.redirect('/');

});


// Start a chat
app.post('/sms', (req, res) => {
	
console.log('SMS has been sent to the driver successfully!');
	
const NEXMO_API_KEY = '267a8d9f'
const NEXMO_API_SECRET = 'D9Qxqddp2fdBprAt'
const TO_NUMBER = '6590110222'
const NEXMO_BRAND_NAME = 'Nexmo'
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
})

const from = NEXMO_BRAND_NAME
const to = TO_NUMBER
const text = 'You have a taxi booking for pickup at Dover Road.' 
 nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})


	res.redirect('/');
});




// Start a phone call
app.post('/call', (req, res) => {

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '267a8d9f',
  apiSecret: 'D9Qxqddp2fdBprAt',
  applicationId: '97b61459-1906-4d55-9062-a1e36c0aa659',
  privateKey: 'C:/GEORGE_WORKSPACE/02.DEV/nexmo_private_keys/voice-test-application/private.key',
});

const ncco = [
  {
    action: 'talk',
    voiceName: 'Joey',
    //text:'This is a text-to-speech test message.',
    text:'Good afternoon, Your SMS OTP is one two three four five six.',
  },
];

nexmo.calls.create(
  {
    to: [{ type: 'phone', number: TO_NUM}],
    from: { type: 'phone', number: FROM_NUM },
    ncco,
  },
  (err, result) => {
    console.log(err || result);
  },
);
  res.redirect('/');
	
});
