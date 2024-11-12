import axios from "axios";

export default class RecipeService {
    static async getByDishName(dishName) {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: 'dcb2e71edd534204b9d81a452935e029',
                query: dishName,
                fillIngredients: true,
                excludeIngredients: true,
                instructionsRequired: true,
                addRecipeInstructions: true,
                addRecipeNutrition: true
            }
        })
        return response
    }
    static async getByIngredients(ingredients) {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                apiKey: 'dcb2e71edd534204b9d81a452935e029',
                ingredients: ingredients,
            }
        })
        return response
    }
    static async getByMySaved(id) {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
                apiKey: 'dcb2e71edd534204b9d81a452935e029',
                id: id
            }
        })
        return response
    }
}