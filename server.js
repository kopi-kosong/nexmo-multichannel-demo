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
	

	res.redirect('/');
});




// Start a phone call
app.post('/call', (req, res) => {
console.log('Calling you!');

  res.redirect('/');
	
});
