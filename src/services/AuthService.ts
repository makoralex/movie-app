import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';

import type { UserData } from '../types/user';

class AuthService {
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    const userData: UserData = {
      uid: user.uid,
      email: user.email,

      username: email.split('@')[0],
      avatar: '',

      likes: [],
      watchLater: [],
      ratings: {},
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return userData;
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    return signOut(auth);
  }
}

export default new AuthService();
