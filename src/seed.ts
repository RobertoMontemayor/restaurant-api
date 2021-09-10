import { createConnection, getRepository } from 'typeorm';
import App from '@/app';
import { dbUsersConnection } from './databases';
import { UserEntity } from './entity/users.entity';
import {dbUsersConfig} from "./configs/development.json"
import { CreateUserDto } from '@dtos/users.dto';
import UserRoute from './routes/users.route';

const generateUsers = async ()=>{
    const names = [
        "Roberto",
        "Javier",
        "Hugo"
    ]
    const lastNames = [
        "Martinez",
        "Gonzales",
        "Hernandez"
    ]
    const Users = dbUsersConfig
    console.log(Users)
    const usersRoute = new UserRoute();
    const users = usersRoute.usersController.userService.users;
    const connection = await createConnection({
        type: "mysql",
        name: "Users",
        host: Users.host,
        port: 3306,
        username: Users.user,
        password: Users.password,
        database: Users.database,
        synchronize: true,
        logging: false,
        entities: [UserEntity],  
        cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
        },
    });
    const usersRepository = connection.getRepository(users)

    for(let i = 0; i<names.length;i++){
        for(let j = 0; j<lastNames.length; j++){
            let userData: CreateUserDto = {
                name: names[i]+" "+lastNames[j],
                password: 'password',
              };
            await usersRepository.save(userData)
        }
    }
}
generateUsers()

