export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}