import { Chapter } from './chapter';
import { Quiz } from './quiz';

export interface Question {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  rightAnswerIndex: number;  
  quiz: Quiz;
  quizTitle: string;
  quizId: number;
 

}
