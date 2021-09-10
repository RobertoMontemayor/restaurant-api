import { BaseEntity, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import {OrderEntity} from "./orders.entity";
import {ItemEntity} from "./items.entity";
@Entity()
export class OrderItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @ManyToOne(type => OrderEntity, order => order.id) @JoinColumn()
    order!: OrderEntity
    @OneToOne(type => ItemEntity) @JoinColumn()
    item!: ItemEntity
}