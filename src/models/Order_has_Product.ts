import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable, OneToMany} from "typeorm";
import { Custom_Product } from "./Custom_Product";
import { Exclude_Ingredient_For_Order } from "./Exclude_Ingredient_For_Order";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class Order_has_Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.user_h_order, { onDelete: 'CASCADE' })
    order: Order


    @ManyToOne(() => Product, product => product.order_h_product, { onDelete: 'CASCADE' })
    product: Product

    @ManyToOne(() => Custom_Product, product_custom => product_custom.order_h_custom_product, { onDelete: 'CASCADE' })
    product_custom: Custom_Product


    @OneToMany(() => Exclude_Ingredient_For_Order, exclude_ingredient_for_order => exclude_ingredient_for_order.order_h_product,{
        cascade: true,
    })
    exclude_ingredient_for_order : Exclude_Ingredient_For_Order[]
}




