import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Exclude_Ingredient_For_Order } from "./Exclude_Ingredient_For_Order";
import { Product_has_Ingredient } from "./Product_has_Ingredient";


@Entity()
export class Ingredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column()
    stock: number;

    @Column({
        nullable: true,
    })
    img_name?: string;


    @OneToMany(() => Product_has_Ingredient, product_h_ingredient => product_h_ingredient.ingredient)
    product_h_ingredient : Product_has_Ingredient[]



    @OneToMany(() => Exclude_Ingredient_For_Order, exclude_ingredient_for_order => exclude_ingredient_for_order.ingredient)
    exclude_ingredient_for_order : Exclude_Ingredient_For_Order[]

}