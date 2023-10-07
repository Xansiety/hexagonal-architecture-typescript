import { ExternalUser, User } from "../../app/schemas/user.schema";

export interface ForManagingUserDriver {
  getUser(email: string): Promise<ExternalUser>;
  createUser(user: User, password: string): Promise<ExternalUser>;
}