import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Order_has_Product } from "./Order_has_Product";
import { Product } from "./Product";


@Entity()
export class Exclude_Ingredient_For_Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    exclude_ingredient_for_order_id: number;


    @ManyToOne(() => Ingredient, ingredient => ingredient.exclude_ingredient_for_order, { onDelete: 'CASCADE' })
    ingredient: Ingredient


    @ManyToOne(() => Order_has_Product, order_h_product => order_h_product.exclude_ingredient_for_order, { onDelete: 'CASCADE' })
    order_h_product: Order_has_Product

    @ManyToOne(() => Product, product => product.exclude_ingredient_for_order, { onDelete: 'CASCADE' })
    product: Product
}