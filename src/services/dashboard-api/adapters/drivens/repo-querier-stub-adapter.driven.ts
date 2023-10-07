import { ExternalUser } from '../../../repository/app/schemas';
import { User } from '../../app/schemas';
import { ForRepoQuerying } from '../../ports/drivens';

const userMock: ExternalUser = {
  id: '1',
  name: 'John Doe Mock',
  email: 'jhon@gmail.com'
};

export class RepoQuerierStub implements ForRepoQuerying {
  getUser(_email: string): Promise<ExternalUser> {
    console.log('RepoQuerierStub.getUser', _email);
    return Promise.resolve(userMock);
  }
  createUser(_user: User): Promise<ExternalUser> {
    console.log('RepoQuerierStub.createUser', _user);
    return Promise.resolve(userMock);
  }
}
