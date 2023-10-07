import { DashboardApi } from './dashboard-api';
import { ControlAuthenticatorStub, RepoQuerierStub } from '../adapters/drivens';
import { AuthenticatorProxyAdapter } from '../adapters/drivers';
import { initTRPC } from '@trpc/server';
import { authTRPCAdapterDriver } from '../adapters/drivers/auth-trpc-adapter.driver';

const compositionMock = () => {
  // Drivens
  const controlAuthenticatorStubMock = new ControlAuthenticatorStub();
  const RepoQuerierStubMock = new RepoQuerierStub();

  // App
  const dashboardApiMock = new DashboardApi(controlAuthenticatorStubMock, RepoQuerierStubMock);

  // Drivers
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(dashboardApiMock);

  return { authenticatorProxyAdapter };
};

export const { authenticatorProxyAdapter } = compositionMock();

// authenticatorProxyAdapter.login('jhon@gmail.com', '123456');
// authenticatorProxyAdapter.register({ name: 'jhon', email: 'jhon@gmail.com', password: 'password' });

export const localTRPCCompose = () => {
  // Drivens
  const controlAuthenticatorStubMock = new ControlAuthenticatorStub();
  const RepoQuerierStubMock = new RepoQuerierStub();

  // App
  const dashboardApiMock = new DashboardApi(controlAuthenticatorStubMock, RepoQuerierStubMock);

  // TRCP Instance
  const t = initTRPC.create();

  // TRCP Driver
  const authTRPCAdapterRouter = authTRPCAdapterDriver(dashboardApiMock, t);

  // Router
  const appRouter = t.router({
    auth: authTRPCAdapterRouter
  });

  return { appRouter };
};
