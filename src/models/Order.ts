import { BaseEntity, OneToMany , ManyToMany ,Column, Entity , PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { Invoice } from "./Invoice";
import { Order_has_Product } from "./Order_has_Product";
import { User_has_Order } from "./User_has_Order";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' }) 
    date: Date;

    @Column()
    state: boolean;

    @OneToMany(() => User_has_Order, user_h_order => user_h_order.order)
    user_h_order : User_has_Order[]

    @OneToMany(() => Order_has_Product, order_h_product => order_h_product.order)
    order_h_product : Order_has_Product[]


    @OneToMany(() => Invoice, invoice => invoice.order)
    invoice : Invoice[]
}