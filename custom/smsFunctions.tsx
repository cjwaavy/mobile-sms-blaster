const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

type sendSMSProps = {
    phone: string
}
export async function sendSMS({phone}:sendSMSProps) {
    
}