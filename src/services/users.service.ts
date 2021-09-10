import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '../entity/users.entity';
import { HttpException } from '../exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '../utils/util';

class UserService {
  public users = UserEntity;
  public async findAllUser(): Promise<User[]> {
    const connection = getConnection("Users")
    const userRepository = connection.getRepository(UserEntity);
    const users: User[] = await userRepository.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "Error");
    const connection = getConnection("Users")
    const userRepository = connection.getRepository(UserEntity);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "Error");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Error");
    const connection = getConnection("Users")
    const userRepository = connection.getRepository(UserEntity);
    const findUser: User = await userRepository.findOne({ where: { name: userData.name } });
    if (findUser) throw new HttpException(409, `You're user ${userData.name} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await userRepository.save({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "ErrorData");
    const connection = getConnection("Users")
    const userRepository = connection.getRepository(UserEntity);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "Error");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await userRepository.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await userRepository.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "ErrorId");
    const connection = getConnection("Users")
    const userRepository = connection.getRepository(UserEntity);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "Error");

    await userRepository.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
