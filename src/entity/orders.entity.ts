import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import {OrderItemEntity} from "./orderItem.entity";
@Entity()
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @OneToMany(type => OrderItemEntity, order_item => order_item.item) @JoinColumn()
    order_items!: OrderItemEntity[]
    @Column()
    subtotal!: number
    @Column()
    vat!: number
    @Column()
    total!: number
    @Column()
    token!: string
    @Column()
    total_items!: number
    @Column()
    customer_name!: string
    @Column()
    status!: string
}
