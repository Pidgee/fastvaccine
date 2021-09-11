import * as functions from 'firebase-functions';

export class TwilioConfig {
  public static getAccountSid() {
    return functions.config().twilio.accountsid;
  }

  public static getAuthToken() {
    return functions.config().twilio.authtoken;
  }

  public static getSenderPhone() {
    return functions.config().twilio.sender.phone;
  }
}
