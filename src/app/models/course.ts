import { Category } from './Category';
import { Admin } from './admin';

export interface Course {
  id?: number;
  title?: string;
  description?: string;
  rate?: string;
  price?: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  category?: Category;
  categoryName?: string;
  categoryId?: number;
  adminId?: number;
  admin?:Admin;
  byteImg?: string;
  img?: File;
  processedImg?: string; 


}
