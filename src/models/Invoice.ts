import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Exclude_Ingredient_For_Order } from "./Exclude_Ingredient_For_Order";
import { Order } from "./Order";
import { Product_has_Ingredient } from "./Product_has_Ingredient";


@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'timestamp' }) 
    date: Date;

    @ManyToOne(() => Order, order => order.invoice)
    order: Order;

    

    
}