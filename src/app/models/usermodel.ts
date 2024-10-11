export interface UserModel {
    userId: number;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    adObjId: string;
    profilePictureUrl?: string; // Optional field
    bio?: string;               // Optional field
  }
  