
export interface Order {
    id: number;
    totalAmount?: number;
    username?: string;
    adminId?: number;
    orderStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;

  }