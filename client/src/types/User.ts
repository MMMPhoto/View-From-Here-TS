import { Photo } from './Photo'

export type User = {
  id:  string,
  userName: string,
  email: string,
  password: string,
  savedPics?: Photo[]
};
