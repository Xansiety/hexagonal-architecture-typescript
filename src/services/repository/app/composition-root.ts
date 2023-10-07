import { LoggerStubAdapter } from '../adapaters/drivens';
import { Repository } from './repository';
import { UserManagerProxyDriver } from '../adapaters/drivers/user-manager-proxy.driver';
export const compositionRootMock = () => {
  
  const monitorStub = new LoggerStubAdapter();
  const repositoryMock = new Repository(monitorStub);

  const userManagerProxy = new UserManagerProxyDriver(repositoryMock);

  return { userManagerProxy };
};

export const { userManagerProxy } = compositionRootMock();

const registerMock = {
  name: 'Xansiety',
  email: 'xansiety@gmail.com',
  password: '123456'
};

userManagerProxy.getUser('xansiety@gmail.com');
userManagerProxy.createUser(registerMock);
