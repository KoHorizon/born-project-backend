
import { User } from '../models/User';
import { Order } from '../models/Order';
import { createConnection, getConnection } from "typeorm";
import { Product } from '../models/Product';
import { Ingredient } from '../models/Ingredient';
import { Order_has_Product } from '../models/Order_has_Product';
import { User_has_Order } from '../models/User_has_Order';
import { Product_has_Ingredient } from '../models/Product_has_Ingredient';
import { Exclude_Ingredient_For_Order } from '../models/Exclude_Ingredient_For_Order';
import { Invoice } from '../models/Invoice';




class Connection {

    static ConnectToDatabase () {

        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "tiger",
            database: "co-su_backend",
            entities: [
                User,
                Order,
                Product,
                Ingredient,
                Invoice,
                User_has_Order,
                Order_has_Product,
                Product_has_Ingredient,
                Exclude_Ingredient_For_Order
            ],
            synchronize: true,
            logging: false
        })

    }
}


export default Connection;
