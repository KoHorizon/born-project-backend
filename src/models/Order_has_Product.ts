import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable, OneToMany} from "typeorm";
import { Exclude_Ingredient_For_Order } from "./Exclude_Ingredient_For_Order";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class Order_has_Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.user_h_order)
    order: Order


    @ManyToOne(() => Product, product => product.order_h_product)
    product: Product



    @OneToMany(() => Exclude_Ingredient_For_Order, exclude_ingredient_for_order => exclude_ingredient_for_order.order_h_product,{
        cascade: true,
    })
    exclude_ingredient_for_order : Exclude_Ingredient_For_Order[]
}




