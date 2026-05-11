import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { db } from '../firebase/firestore';
import type { UserData } from '../types/user';

class UserMovieService {
  private ref(uid: string) {
    return doc(db, 'users', uid);
  }

  async getUser(uid: string): Promise<UserData | null> {
    const snap = await getDoc(this.ref(uid));
    return snap.exists() ? (snap.data() as UserData) : null;
  }

  async likeMovie(uid: string, movieId: number) {
    await setDoc(
      this.ref(uid),
      {
        likes: arrayUnion(movieId),
      },
      { merge: true },
    );
  }

  async unlikeMovie(uid: string, movieId: number) {
    await setDoc(
      this.ref(uid),
      {
        likes: arrayRemove(movieId),
      },
      { merge: true },
    );
  }

  async rateMovie(uid: string, movieId: number, rating: number) {
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
  }

  async removeRating(uid: string, movieId: number) {
    const user = await this.getUser(uid);
    if (!user?.ratings) return;

    const newRatings = { ...user.ratings };
    delete newRatings[movieId.toString()];

    await setDoc(this.ref(uid), { ratings: newRatings }, { merge: true });
  }

  async addToWatchLater(uid: string, movieId: number) {
    await setDoc(
      this.ref(uid),
      {
        watchLater: arrayUnion(movieId),
      },
      { merge: true },
    );
  }

  async removeFromWatchLater(uid: string, movieId: number) {
    await setDoc(
      this.ref(uid),
      {
        watchLater: arrayRemove(movieId),
      },
      { merge: true },
    );
  }
}

export default new UserMovieService();
