import { Twilio } from 'twilio';

export class Sms {
  constructor(private twilio: Twilio, private fromPhoneNumber: string) {}

  async send(phoneNumber: string, message: string): Promise<void> {
    return this.twilio.messages
      .create({
        body: message,
        from: this.fromPhoneNumber,
        to: `+${phoneNumber}`,
      })
      .then((message) => console.info(message.sid));
  }
}
