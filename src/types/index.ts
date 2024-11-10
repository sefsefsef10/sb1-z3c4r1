export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}