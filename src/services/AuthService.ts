import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';

import type { UserData } from '../types/user';
import logger from './logger';

class AuthService {
  async register(email: string, password: string) {
    try {
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
    } catch (error) {
      logger.error('register failed:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      logger.error('login failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      return signOut(auth);
    } catch (error) {
      logger.error('logout failed:', error);
      throw error;
    }
  }
}

export default new AuthService();
