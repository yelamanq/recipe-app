import axios from "axios";

export default class RecipeService {
    static async getByDishName(dishName) {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: '28a6cea647384af7b42622a2d40d6ada',
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
                apiKey: '28a6cea647384af7b42622a2d40d6ada',
                ingredients: ingredients,
            }
        })
        return response
    }
    static async getByMySaved(id) {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
                apiKey: '28a6cea647384af7b42622a2d40d6ada',
                id: id
            }
        })
        return response
    }
}