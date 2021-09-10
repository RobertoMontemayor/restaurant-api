import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
import { User } from '@interfaces/users.interface';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name!: string
  @Column()
  password!: string
}
