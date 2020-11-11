import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import UpdateProfileService from '../UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'other name',
      email: 'other@email.com',
    });

    expect(updatedUser.name).toBe('other name');
    expect(updatedUser.email).toBe('other@email.com');
  });

  it('should not be able to update the user profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'non existing user id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'email@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'other name',
      email: 'other@email.com',
      oldPassword: '123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'other name',
        email: 'other@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'other name',
        email: 'other@email.com',
        oldPassword: 'wrong old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
