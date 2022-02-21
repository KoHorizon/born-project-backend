import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, ManyToOne, JoinTable} from "typeorm";
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
}


