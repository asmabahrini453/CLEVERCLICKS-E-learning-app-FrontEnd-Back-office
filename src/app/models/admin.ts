export interface Admin {
  
  id?: number;
  username?:string ;
  firstName?: string;
  lastName?: string;
  phone?: string;
  description?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  byteImg?: string;
  img?: File;
  processedImg?: string;
}
