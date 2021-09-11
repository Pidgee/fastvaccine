### Context

Small app that check periodically the ClicSante website to know when a new Covid vaccination age group is open and then notify a list of contact via text messages.

The goal was to experiment with Twilio's API, Firebase Schedules and Firestore Triggers.

---
### Setup

Be sure to have Firebase installed on your machine

``npm install -g firebase-tools``

Then, you can init a Firebase project:

``firebase init``

You will simply have to install the 'functions' module.

Prior to deploying, be sure to set the following variables

``firebase functions:config:set twilio.accountsid="yourAccountSid" twilio.authtoken="yourAuthToken" twilio.sender.phone="phoneNumber"
``

Finally, you can run the deployment command:

``npm run deploy``