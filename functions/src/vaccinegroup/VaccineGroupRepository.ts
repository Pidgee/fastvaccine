import * as admin from 'firebase-admin';

import Firestore = admin.firestore.Firestore;

const VACCINE_GROUP_COLLECTION = 'vaccine_group';

export type VaccineGroup = {
  minAge: number;
};

export class VaccineGroupRepository {
  constructor(private firestore: Firestore) {}

  public async save({ minAge }: VaccineGroup): Promise<void> {
    await this.firestore
      .collection(VACCINE_GROUP_COLLECTION)
      .doc(minAge.toString())
      .set({ minAge, openAt: new Date() });
  }
}
