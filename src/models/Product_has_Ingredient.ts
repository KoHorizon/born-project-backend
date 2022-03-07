import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import { Custom_Product } from "./Custom_Product";
import { Ingredient } from "./Ingredient";
import { Product } from "./Product";


@Entity()
export class Product_has_Ingredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    product_has_ingredient_id: number;


    @ManyToOne(() => Product, product => product.product_h_ingredient)
    product: Product

    @ManyToOne(() => Ingredient, ingredient => ingredient.product_h_ingredient)
    ingredient: Ingredient


    @ManyToOne(() => Custom_Product, product_custom => product_custom.product_h_ingredient)
    product_custom: Custom_Product
}


