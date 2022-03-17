import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Order_has_Product } from "./Order_has_Product";
import { Product_has_Ingredient } from "./Product_has_Ingredient";


@Entity()
export class Custom_Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @OneToMany(() => Order_has_Product, order_h_custom_product => order_h_custom_product.product_custom, { onDelete: 'CASCADE' })
    order_h_custom_product : Order_has_Product[]


    @OneToMany(() => Product_has_Ingredient, product_h_ingredient => product_h_ingredient.product_custom, { onDelete: 'CASCADE' })
    product_h_ingredient : Product_has_Ingredient[]
}