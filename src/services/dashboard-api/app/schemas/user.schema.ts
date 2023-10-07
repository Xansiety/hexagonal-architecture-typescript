import { z } from 'zod';
import { PermissionsSchema } from './auth.schema';

// ZOD Type
export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().min(6).max(255).email('Invalid email'),
  name: z.string(),
  token: z.string(),
  refreshToken: z.string().optional(),
  permissions: PermissionsSchema
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

export interface User extends Pick<AuthenticatedUser, 'email' | 'name'> {
  password: string;
}
