import { Quiz } from './quiz';

export interface User {
  byteImg: string;
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserScore {
  id?: number;
  score?: number;
  quiz?: Quiz;
  quizTitle?: string;
  quizId?: number;
  user?: User;
  userId?: number;
  name?:string ;
  email?:string ;
}
