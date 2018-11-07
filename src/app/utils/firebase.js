import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
//export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

const FireBaseTools = {

  /**
   * Get the firebase database reference.
   *
   * @param path {!string|string}
   * @returns {!firebase.database.Reference|firebase.database.Reference}
   */
    getDatabaseReference: path => firebaseDb.ref(path),
};

export default FireBaseTools;
