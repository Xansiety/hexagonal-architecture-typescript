import { describe, it, expect } from 'vitest';
import { ControlAuthenticatorStub, RepoQuerierStub } from '../adapaters/drivens';
import { DashboardApi } from './dashboard-api';
import { AuthenticatedUser, User } from './schemas/user.schema';

describe('Dashboard API', () => {
  // it(); // run in sequence
  // it.concurrent(); // run in parallel
  // it.concurrent(); // run in parallel
  const controlAuthenticatorStubMock = new ControlAuthenticatorStub();
  const RepoQuerierStubMock = new RepoQuerierStub();

  const dashboardApiMock = new DashboardApi(controlAuthenticatorStubMock, RepoQuerierStubMock);

  it.concurrent('should login', async () => {
    // GIVEN
    const mockedParams = {
      email: 'jhon@gmail.com',
      password: '123456'
    };

    const expectedResult: AuthenticatedUser = {
      id: '1',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      token: 'token',
      refreshToken: 'refreshToken',
      permissions: {
        admin: true,
        user: true
      }
    };

    // WHEN
    const result = await dashboardApiMock.login(mockedParams.email, mockedParams.password);

    // THEN
    expect(result).toEqual(expectedResult);
  });

  it.concurrent('should register', async () => {
    // GIVEN
    const mockedUserParams: User = {
      email: 'jhon@gmail.com',
      name: 'John Doe'
    };
    const mockedPassword = '123456';

    const expectedResult: AuthenticatedUser = {
      id: '1',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      token: 'token',
      refreshToken: 'refreshToken',
      permissions: {
        admin: true,
        user: true
      }
    };

    // WHEN
    const result = await dashboardApiMock.register(mockedUserParams, mockedPassword);

    // THEN
    expect(result).toEqual(expectedResult);

  });
});
