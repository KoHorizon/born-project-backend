import { Response, Request } from 'express';
import { createIngredient, getIngredientAll } from '../Database/ingredient';



export async function ingredientControllerPost(req: Request, res: Response) {
    try {
        const value = req.body
        await createIngredient(value);
        return res.status(200).json({
            status: 200,
            response: 'Ingredient created'
        });
    } catch (error) {
        switch (error.message) {
            case 'not array':
                return res.status(400).json({
                    status:'error',
                    response: 'Not an array'
                });
                break;
            case 'wrong format':
                return res.status(400).json({
                    status:'error',
                    response: 'Wrong format given'
                });
                break;
        };
    }
}

export async function ingredientControllerGet(req: Request, res: Response) {
    try {
        const ingredient = await getIngredientAll();
        return res.status(200).json({
            status: 200,
            data: ingredient
        })
    } catch (error) {
        return res.status(404).json({
            status: 404,
            response: 'ingredient not found'
        });
    }
}