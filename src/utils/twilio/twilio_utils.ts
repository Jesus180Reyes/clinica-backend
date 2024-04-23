/* eslint-disable @typescript-eslint/no-explicit-any */
import {config} from 'dotenv';
config();
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import {Twilio} from 'twilio';

export class TwilioUtils {
   static sendSms = async(to: string, body: string ) => {
   try {
    const client = new Twilio(accountSid, authToken)
    await client.messages
    .create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
    });
    console.log(client);
    return client;
   } catch (error: any) {
    console.error(`Hubo un error al envio del SMS: ${error.message} `);
    return;
   }
    
    

    }
}