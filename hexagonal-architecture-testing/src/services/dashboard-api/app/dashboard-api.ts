
import { ForAuthenticating } from '../ports';
import { ForControlAuthenticating, ForRepoQuerying } from '../ports/drivens';
import { AuthenticatedUser, User } from './schemas';

// ForAuthenticating is the driver port due to is the contract that the driver adapter must implement, detail the contract
export class DashboardApi implements ForAuthenticating {
  // ForControlAuthenticating and ForRepoQuerying are the driven ports due to are  resources, adapter to comunícate with another hexagon
  constructor(private readonly controlAuthenticator: ForControlAuthenticating, private readonly repoQuerier: ForRepoQuerying) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const authDetails = await this.controlAuthenticator.getAuthDetails(email, password);
    const permissions = await this.controlAuthenticator.getPermissions(email, password);
    const user = await this.repoQuerier.getUser(email);

    const result = {
      ...user,
      ...authDetails, 
      permissions,
    };

    console.log('LOGIN result', result);
    return result;
  }

  async register(user: User, password: string): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user, password);
    const authDetails = await this.controlAuthenticator.getAuthDetails(newUser.email, password);
    const permissions = await this.controlAuthenticator.getPermissions(newUser.email, password);

    const result = {
      ...newUser,
      ...authDetails,
      permissions,
    };

    console.log('REGISTER result', result);
    return result;
  }
}
