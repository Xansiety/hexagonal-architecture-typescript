import { ForManagingUserDriver } from '../ports/drivers';
import { RepoUser, User } from './schemas';
import { ForMonitoringDriven } from '../ports/drivens/for-monitoring.driven';
import { ExternalUser } from './schemas/user.schema';

export class Repository implements ForManagingUserDriver {
  private userList: RepoUser[] = [];

  constructor(private readonly logger: ForMonitoringDriven) {}

  getUser(_email: string): Promise<ExternalUser> {
    const user = this.userList.find((user) => user.email === _email);
    if (!user) {
      this.logger.log('GetUser', 'User not found');
      throw new Error('User not found');
    }
    return Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  createUser(_user: User): Promise<ExternalUser> {
    const user = this.userList.find((user) => user.email === _user.email);
    if (user) {
      this.logger.log('CreateUser', 'User already exists');
      throw new Error('User already exists');
    }

    const newUser = {
      ..._user,
      id: String(this.userList.length + 1)
    };
    this.userList.push(newUser);
    return Promise.resolve({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  }
}
