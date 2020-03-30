'use strict'

const Nexmo = require('nexmo');

class SmsProxy {

    constructor() {
        this.nexmo = new Nexmo({
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET
  
           //apiKey: '267a8d9f',
          // apiSecret: 'D9Qxqddp2fdBprAt'
        }, {
                debug: true
            });
    }

    createChat(userANumber, userBNumber) {
        this.chat = {
            userA: userANumber,
            userB: userBNumber
        };
 
        this.sendSMS();
    }

    sendSMS() {


        /*  
            Send a message from userA to the virtual number
        */
        this.nexmo.message.sendSms(this.chat.userA,
                                    process.env.VIRTUAL_NUMBER,
                                    'Reply to this SMS to talk to UserA');

        /*  
            Send a message from userB to the virtual number
        */
        this.nexmo.message.sendSms(this.chat.userB,
                                    process.env.VIRTUAL_NUMBER,
                                    'Reply to this SMS to talk to UserB');
    }


    getDestinationRealNumber(from) {
        let destinationRealNumber = null;

        // Use `from` numbers to work out who is sending to whom
        const fromUserA = (from === this.chat.userA);
        const fromUserB = (from === this.chat.userB);

        if (fromUserA || fromUserB) {
            destinationRealNumber = fromUserA ? this.chat.userB : this.chat.userA;
        }

        return destinationRealNumber;
    }

   
    proxySms(from, text) {
        console.log(`proxySms` + text);
        // Determine which real number to send the SMS to
        const destinationRealNumber = this.getDestinationRealNumber(from);
    if (destinationRealNumber  === null) {
            console.log(`No chat found for this number`);
            return;
        }
        console.log(`process.env.VIRTUAL_NUMBER`+process.env.VIRTUAL_NUMBER);   
        console.log("====> destination : " + destinationRealNumber);

        // Send the SMS from the virtual number to the real number
        this.nexmo.message.sendSms(process.env.VIRTUAL_NUMBER,
                                   destinationRealNumber,
                                   text);
    }

}

module.exports = SmsProxy;
