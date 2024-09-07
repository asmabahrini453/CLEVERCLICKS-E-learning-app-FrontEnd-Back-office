// category.model.ts
export interface Category {
  id?: number;
  name?: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  byteImg?: string;
  img?: File;
  processedImg?: string; 
}
