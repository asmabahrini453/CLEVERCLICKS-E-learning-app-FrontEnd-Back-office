import { Chapter } from './chapter';

export interface Quiz {
  id?: number;
  quizTitle?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  chapter?: Chapter;
  chapterTitle?: string;
  chapterId?: number;
 

}
