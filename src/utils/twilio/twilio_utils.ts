/* eslint-disable @typescript-eslint/no-explicit-any */
const accountSid = 'AC1322f616907a1f6b2ffebff0cd06d5e2';
const authToken = '09357e9f705af4055e0b1c029cac5896';
import {Twilio} from 'twilio';

export class TwilioUtils {
   static sendSms = async(to: string, body: string ) => {
   try {
    const client = new Twilio(accountSid, authToken)
    await client.messages
    .create({
        body: 'asdsadsaasd',
        from: '+12293372909',
        to: '+50488513318',
    });
    console.log(client);
    return client;
   } catch (error) {
    console.log(error);
    return;
   }
    
    

    }
}