import { Permissions } from './auth.schema';
export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  token: string;
  refreshToken: string;
  permissions: Permissions;
}

export type User = Pick<AuthenticatedUser, 'email' | 'name'>;

// export type User = Omit<AuthenticatedUser, 'id', 'token', 'refreshToken'>;
