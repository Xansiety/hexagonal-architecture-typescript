import { DashboardApi } from './dashboard-api';
import { ControlAuthenticatorStub, RepoQuerierStub } from '../adapaters/drivens';
import { AuthenticatorProxyAdapter } from '../adapaters/drivers';

const compositionMock = () => {
  const controlAuthenticatorStubMock = new ControlAuthenticatorStub();
  const RepoQuerierStubMock = new RepoQuerierStub();

  const dashboardApiMock = new DashboardApi(controlAuthenticatorStubMock, RepoQuerierStubMock);

  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(dashboardApiMock);

  return { authenticatorProxyAdapter };
};

export const { authenticatorProxyAdapter } = compositionMock();

authenticatorProxyAdapter.login('jhon@gmail.com', '123456');
authenticatorProxyAdapter.register({ name: 'jhon', email: 'jhon@gmail.com', password: 'password' });
