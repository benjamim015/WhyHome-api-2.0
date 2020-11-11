import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import ShowProfileService from '../ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('email@example.com');
  });

  it('should not be able to show the user profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        userId: 'non existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
