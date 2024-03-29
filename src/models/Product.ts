import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Exclude_Ingredient_For_Order } from "./Exclude_Ingredient_For_Order";
import { Order_has_Product } from "./Order_has_Product";
import { Product_has_Ingredient } from "./Product_has_Ingredient";


@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true,
    })
    img_name?: string;

    @Column({
        nullable: true,
    })
    availability: boolean;

    @Column({
        nullable: true,
    })
    custom: boolean;

    @Column({
        nullable: true,
    })
    day_special: boolean;
    
    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @OneToMany(() => Order_has_Product, order_h_product => order_h_product.product, { onDelete: 'CASCADE' })
    order_h_product : Order_has_Product[]


    @OneToMany(() => Product_has_Ingredient, product_h_ingredient => product_h_ingredient.product, { onDelete: 'CASCADE' })
    product_h_ingredient : Product_has_Ingredient[]


    @OneToMany(() => Exclude_Ingredient_For_Order, exclude_ingredient_for_order => exclude_ingredient_for_order.product, { onDelete: 'CASCADE' })
    exclude_ingredient_for_order : Exclude_Ingredient_For_Order[]
}