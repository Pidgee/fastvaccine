import { FirebaseConfig } from '../../config/FirebaseConfig';
import { ContactRepository } from '../ContactRepository';

describe('Contact Repository Test', () => {
  const contactRepository = new ContactRepository(FirebaseConfig.getApp().firestore());

  it('When saving contact, Then contact is persisted', async () => {
    await contactRepository.save({ id: '1', name: 'test', phoneNumber: '14182224444', birthYear: 1991 });
    const contacts = await contactRepository.findAll();
    expect(contacts.length).toEqual(1);
  });
});
