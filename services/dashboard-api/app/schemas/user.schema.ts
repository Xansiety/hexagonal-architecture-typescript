export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  token: string;
  refreshToken: string;
}

export type User = Pick<AuthenticatedUser, 'email' | 'name'>;

// export type User = Omit<AuthenticatedUser, 'id', 'token', 'refreshToken'>;
