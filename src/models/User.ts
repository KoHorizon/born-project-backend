import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, OneToMany} from "typeorm";
import { User_has_Order } from "./User_has_Order";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    pincode: string;

    @Column()
    role: string;


    @OneToMany(() => User_has_Order, user_h_order => user_h_order.user, { onDelete: 'CASCADE' })
    user_h_order : User_has_Order[]
}