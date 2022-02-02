import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Order } from "./Order";
import { Order_has_Product } from "./Order_has_Product";
import { Product_has_Ingredient } from "./Product_has_Ingredient";


@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @OneToMany(() => Order_has_Product, order_h_product => order_h_product.product)
    order_h_product : Order_has_Product[]


    @OneToMany(() => Product_has_Ingredient, product_h_ingredient => product_h_ingredient.product)
    product_h_ingredient : Product_has_Ingredient[]
}