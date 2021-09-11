import * as admin from 'firebase-admin';

import Firestore = admin.firestore.Firestore;

const CONTACT_COLLECTION = 'contacts';

export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  birthYear: number;
};

export class ContactRepository {
  constructor(private firestore: Firestore) {}

  public async save(contact: Contact): Promise<void> {
    await this.firestore
      .collection(CONTACT_COLLECTION)
      .doc(contact.id)
      .set({ name: contact.name, phoneNumber: contact.phoneNumber, birthYear: contact.birthYear });
  }

  public async findAll(): Promise<Contact[]> {
    const snapshot = await this.firestore.collection(CONTACT_COLLECTION).get();
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
        birthYear: doc.data().birthYear,
      };
    });
  }
}
