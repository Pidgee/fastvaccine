import * as admin from 'firebase-admin';

export class FirebaseConfig {
  static getApp(): admin.app.App {
    let app: admin.app.App;
    if (!admin.apps.length) {
      app = admin.initializeApp();
    } else {
      app = admin.app();
    }
    return app;
  }
}
