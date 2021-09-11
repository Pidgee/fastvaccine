import * as functions from 'firebase-functions';

import { ClicSanteApi } from './clicsante/ClicSanteApi';
import { ClicSanteService } from './clicsante/ClicSanteService';
import { FirebaseConfig } from './config/FirebaseConfig';
import { ContactRepository } from './contact/ContactRepository';
import { Sms } from './contact/Sms';
import { NotifyContactService } from './usecase/NotifyContactService';
import { VaccineGroupService } from './usecase/VaccineGroupService';
import { VaccineGroup, VaccineGroupRepository } from './vaccinegroup/VaccineGroupRepository';
import twilio = require('twilio');
import { TwilioConfig } from './config/TwilioConfig';

const firestore = FirebaseConfig.getApp().firestore();

const vaccineGroupService: VaccineGroupService = new VaccineGroupService(
  new ClicSanteService(new ClicSanteApi()),
  new VaccineGroupRepository(firestore),
);

const notifyContactsService: NotifyContactService = new NotifyContactService(
  new ContactRepository(firestore),
  new Sms(twilio(TwilioConfig.getAccountSid(), TwilioConfig.getAuthToken()), TwilioConfig.getSenderPhone()),
);

exports.isVaccineOpen = functions.pubsub.schedule('every 1 minutes').onRun(async () => {
  console.info('Identifying vaccination priority group.');
  return await vaccineGroupService.identifyVaccineGroup();
});

exports.notifyContacts = functions.firestore.document('vaccine_group/{minAge}').onCreate(async (snap) => {
  console.info(`New vaccine group for age ${snap.data().minAge} was created. Notifying contact in vaccine group.`);
  return await notifyContactsService.notifyContactsOfNewVaccineGroup(snap.data() as VaccineGroup);
});
