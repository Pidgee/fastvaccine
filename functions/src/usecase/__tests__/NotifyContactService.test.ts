import { anyString, instance, mock, verify, when } from 'ts-mockito';

import { ContactRepository } from '../../contact/ContactRepository';
import { Sms } from '../../contact/Sms';
import { NotifyContactService } from '../NotifyContactService';

describe('Notify Contact Service Test', () => {
  const contactRepository: ContactRepository = mock<ContactRepository>();
  const sms: Sms = mock<Sms>();
  const notifyContactService = new NotifyContactService(instance(contactRepository), instance(sms));

  it('Given contacts, When notifying age group, Then send SMS', async () => {
    const contactOfAge30 = { id: '1', name: 'Phil', birthYear: 1991, phoneNumber: '14185556666' };
    const contactOfAge25 = { id: '2', name: 'Oli', birthYear: 1996, phoneNumber: '14185557777' };

    when(await contactRepository.findAll()).thenReturn([contactOfAge30, contactOfAge25]);
    await notifyContactService.notifyContactsOfNewVaccineGroup({ minAge: 27 });
    verify(sms.send('14185556666', anyString())).once();
  });
});
