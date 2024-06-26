import {config} from 'dotenv';
config();
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function googleVerify(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const {name, profile, email} =  ticket.getPayload()!;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    return {
        nombre: name,
        img: profile,
        correo: email
    }
}
