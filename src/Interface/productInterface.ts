import { Ingredient } from "../models/Ingredient";
import { Product } from "../models/Product";

export interface createProduct {
    products: Product;
    ingedients: Array<[Ingredient]>;
}