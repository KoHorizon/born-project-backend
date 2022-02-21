import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import { Order } from "./Order";
import { User } from "./User";


@Entity()
export class User_has_Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_has_order_id: number;


    @ManyToOne(() => Order, order => order.user_h_order)
    order: Order


    @ManyToOne(() => User, user => user.user_h_order)
    user: User

    

}




