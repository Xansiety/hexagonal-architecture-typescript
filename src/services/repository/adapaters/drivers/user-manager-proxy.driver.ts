import { Repository } from '../../app/repository';
import { ExternalUser, User } from '../../app/schemas';
import { ForManagingUserDriver } from '../../ports/drivers';

export class UserManagerProxyDriver implements ForManagingUserDriver {
  constructor(private readonly repository: Repository) {}

  getUser(email: string): Promise<ExternalUser> {
    return this.repository.getUser(email);
  }
  createUser(user: User): Promise<ExternalUser> {
    return this.repository.createUser(user);
  }
}
