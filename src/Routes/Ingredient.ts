import express from 'express';
import { Ingredient } from '../models/Ingredient';


let routerIngredient = express.Router();


routerIngredient.post('/ingredients',async (req, res) => {

    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            status : 400,
            response: 'Wrong format given'
        })    
    }
    let acceptedKeys = ['name','price','stock','img_name'];
    let validFormat = true;

    (req.body).forEach(data => {        

        acceptedKeys.forEach(key => {
            if (!(key in data)) {
                validFormat = false;
            }
            
            if (Object.keys(data).length != acceptedKeys.length) {
                validFormat = false;
            }
        })

    })
    
    if (!validFormat) {
        return res.status(400).json({
            status: 'error',
            response: 'Wrong format given'
        })
    }



    let ingredient = new Ingredient();
    (req.body).forEach( async data => {

        Object.entries(data).forEach(([key, value]) => {
            // console.log(key , value); // key ,value

            switch (key) {
                case "name":
                    ingredient.name = data.name;
                    break;
                case "price":
                    ingredient.price = data.price;
                    break;
                case "stock":
                    ingredient.stock = data.stock;
                    break;
                case "img_name":
                    ingredient.img_name = data.img_name;
                    break;
            }

            
        });
        console.log(ingredient);
        
        await Ingredient.save(ingredient);
        
        
    });
    res.status(200).json({status: 200, data: 'Ingredient Data have been saved'})

})




export default routerIngredient;