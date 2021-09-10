import config from 'config';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';
import {UserEntity} from "../entity/users.entity"
import {ItemEntity} from "../entity/items.entity"
import {OrderItemEntity} from "../entity/orderItem.entity"
import { OrderEntity } from '@/entity/orders.entity';

const Users: dbConfig = config.get('dbUsersConfig');
const ItemsOrders: dbConfig = config.get('dbItemsOrdersConfig');
export const dbItemsOrdersConnection: ConnectionOptions = {
  type: "mysql",
  name: "ItemsOrders",
  host: ItemsOrders.host,
  port: 3306,
  username: ItemsOrders.user,
  password: ItemsOrders.password,
  database: ItemsOrders.database,
  synchronize: true,
  logging: false,
  entities: [ItemEntity, OrderItemEntity, OrderEntity],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
export const dbUsersConnection: ConnectionOptions = {
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
};
