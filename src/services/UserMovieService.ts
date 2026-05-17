import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  deleteField,
} from 'firebase/firestore';

import { db } from '../firebase/firestore';
import type { UserData } from '../types/user';
import logger from './logger';

class UserMovieService {
  private ref(uid: string) {
    return doc(db, 'users', uid);
  }

  async getUser(uid: string): Promise<UserData | null> {
    try {
      const snap = await getDoc(this.ref(uid));
      return snap.exists() ? (snap.data() as UserData) : null;
    } catch (error) {
      logger.error('getuser failed:', error);
      return null;
    }
  }

  async likeMovie(uid: string, movieId: number) {
    try {
      await setDoc(
        this.ref(uid),
        {
          likes: arrayUnion(movieId),
        },
        { merge: true },
      );
    } catch (error) {
      logger.error('likemovie failed:', error);
      throw error;
    }
  }

  async unlikeMovie(uid: string, movieId: number) {
    try {
      await setDoc(
        this.ref(uid),
        {
          likes: arrayRemove(movieId),
        },
        { merge: true },
      );
    } catch (error) {
      logger.error('unlikemovie failed:', error);
      throw error;
    }
  }

  async rateMovie(uid: string, movieId: number, rating: number) {
    try {
      const user = await this.getUser(uid);
      const currentRatings = user?.ratings || {};

      await setDoc(
        this.ref(uid),
        {
          ratings: {
            ...currentRatings,
            [movieId.toString()]: rating,
          },
        },
        { merge: true },
      );
    } catch (error) {
      logger.error('ratemovie failed:', error);
      throw error;
    }
  }

  async removeRating(uid: string, movieId: number) {
    try {
      const userRef = this.ref(uid);

      await updateDoc(userRef, {
        [`ratings.${movieId}`]: deleteField(),
      });
    } catch (error) {
      logger.error('removerating failed:', error);
      throw error;
    }
  }

  async addToWatchLater(uid: string, movieId: number) {
    try {
      await setDoc(
        this.ref(uid),
        {
          watchLater: arrayUnion(movieId),
        },
        { merge: true },
      );
    } catch (error) {
      logger.error('addtowatchlater failed:', error);
      throw error;
    }
  }

  async removeFromWatchLater(uid: string, movieId: number) {
    try {
      await setDoc(
        this.ref(uid),
        {
          watchLater: arrayRemove(movieId),
        },
        { merge: true },
      );
    } catch (error) {
      logger.error('removerromwatchlater failed:', error);
      throw error;
    }
  }
}

export default new UserMovieService();
