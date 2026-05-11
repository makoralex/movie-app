export interface UserData {
  uid: string;
  email: string | null;
  username: string;
  avatar: string;
  likes: number[];
  ratings: Record<string, number>;
  watchLater: number[];
}
