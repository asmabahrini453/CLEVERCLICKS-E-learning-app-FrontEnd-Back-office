import { Course } from './course';
import { ChapterImage } from './ChapterImage';

export interface Chapter {
  id: number;
  title: string;
  contents: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  course: Course;
  courseId: number;
  courseName: string;

  images: ChapterImage[];
  processedImg?: string; 

}
