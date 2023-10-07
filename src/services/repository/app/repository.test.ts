import { describe, expect, it } from 'vitest';
import { LoggerStubAdapter } from '../adapaters/drivens';
import { Repository } from './repository';

describe('Repository', () => {
  const monitorStub = new LoggerStubAdapter();
  const repositoryMock = new Repository(monitorStub);

  //   beforeEach(() => {
  //     repositoryMock = new Repository(monitorStub);
  //   });

  it.concurrent('should control that the user does exist', async () => {
    // Given
    const mockedEmail = 'xansiety@gmail.com';

    const expectedResult = {
      id: '1',
      name: 'Xansiety',
      email: 'xansiety@gmail.com'
    };

    // When
    let result;
    try {
      result = await repositoryMock.getUser(mockedEmail);
    } catch (error) {
      /* empty */
    }

    expect(result).not.toEqual(expectedResult);
  });

  it.concurrent('should create a new user', async () => {
    // Given
    const registerMock = {
      name: 'xansiety',
      email: 'xansiety@gmail.com',
      password: '123456'
    };

    const expectedResult = {
      id: '1',
      name:  registerMock.name,
      email:  registerMock.email
    };

    // When
    let result;
    try {
      result = await repositoryMock.createUser(registerMock);
    } catch (error) {
      /* empty */
    }

    // Then
    expect(result).toEqual(expectedResult);
  });

  it.concurrent('should control that the user already exists', async () => {
    // Given
    const registerMock = {
      name: 'xansiety',
      email: 'xansiety@gmail.com',
      password: '123456'
    };

    const expectedResult = {
      ...registerMock,
      id: '1'
    };

    // When
    let result;
    try {
      result = await repositoryMock.createUser(registerMock);
    } catch (error) {
      /* empty */
    }

    // Then
    expect(result).not.toEqual(expectedResult);
  });

  it.concurrent('should get the user by email', async () => {
    // Given
    const mockedEmail = 'xansiety@gmail.com';

    const expectedResult = {
      name: 'xansiety',
      email: 'xansiety@gmail.com',
      id: '1'
    };

    // When
    let result;
    try {
      result = await repositoryMock.getUser(mockedEmail);
    } catch (error) {
      /* empty */
    }

    // Then
    expect(result).toEqual(expectedResult);
  });
});
