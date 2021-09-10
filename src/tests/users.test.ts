import bcrypt from 'bcrypt';
import request from 'supertest';
import { createConnection, getRepository, getConnection } from 'typeorm';
import App from '../app';
import { dbUsersConnection } from '../databases';
import { CreateUserDto } from '@dtos/users.dto';
import UserRoute from '@routes/users.route';
beforeAll(async () => {
  await createConnection(dbUsersConnection);
});

afterAll(async () => {
  await getConnection("Users").close()
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const connection = getConnection("Users")
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;
      const userRepository = connection.getRepository(users);
      userRepository.find = jest.fn().mockReturnValue([
        {
          id: 1,
          user: 'a@user.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          id: 2,
          user: 'b@user.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          id: 3,
          user: 'c@user.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const connection = getConnection("Users")
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;
      const userRepository = connection.getRepository(users);
      const userId = 1;
      userRepository.findOne = jest.fn().mockReturnValue({
        id: userId,
        name: 'a',
        password: "password",
      });

      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create user', async () => {
      const userData: CreateUserDto = {
        name: 'test@user.com',
        password: 'q1w2e3r4!',
      };

      const connection = getConnection("Users")
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;
      const userRepository = connection.getRepository(users);

      userRepository.findOne = jest.fn().mockReturnValue(null);
      userRepository.save = jest.fn().mockReturnValue({
        id: 1,
        user: userData.name,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        name: 'test@user.com',
        password: '1q2w3e4r!',
      };

      const connection = getConnection("Users")
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;
      const userRepository = connection.getRepository(users);

      userRepository.findOne = jest.fn().mockReturnValue({
        id: userId,
        name: userData.name,
        password: await bcrypt.hash(userData.password, 10),
      });
      userRepository.update = jest.fn().mockReturnValue({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });
      userRepository.findOne = jest.fn().mockReturnValue({
        id: userId,
        name: userData.name,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete user', async () => {
      const userId = 1;

      const connection = getConnection("Users")
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;
      const userRepository = connection.getRepository(users);

      userRepository.findOne = jest.fn().mockReturnValue({
        id: userId,
        user: 'a@user.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
