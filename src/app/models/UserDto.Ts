export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  byteImg: string; 
  img?: File; 
  processedImg?: string; 
}
