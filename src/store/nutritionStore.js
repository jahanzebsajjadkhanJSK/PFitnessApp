import { observable, action, makeAutoObservable } from 'mobx'
import { apiCaller } from '../services/apiCaller'

export class NutritionStore {
  @observable accessor counter = 0;
  @observable accessor allFood = {};
  @observable accessor dailyLog = {};

  constructor(rootStore) {
    this.rootStore = rootStore
    this.counter = 0
    this.allFood = {}
    this.dailyLog = {}
  }

  @action
  increment() {
    this.counter += 1;
  }

  @action
  decrement() {
    this.counter -= 1;
  }


  @action
  async addNutritionLog(data,token) {
    try {
      const response = await apiCaller(token).post('/nutrition/log', data);
      return response.data;
    } catch (error) {
      console.error('Error adding new meal:', error);
      throw error;
    }
  }

  @action
  async getAllFoods(token) {
    try {
      const response = await apiCaller(token).get('/nutrition/all');
      this.allFood = response.data;
    } catch (error) {
      console.error('Error getting all foods:', error);
    }
  }

  @action
  async addCustomFood(foodData, token) {
    const apiData = {
      name: foodData?.name,
      quantity: foodData?.quantity,
      energy_kcal: foodData?.energy_kcal,
      carbohydrates: {
        glucose: foodData?.glucose,
        fructose: foodData?.fructose,
        fibre: foodData?.fibre,
      },
      protein_g: foodData?.protein_g,
      fats: {
        unsaturated_fat_g: foodData?.unsaturated_fat_g,
        polyunsaturated_fat_g: foodData?.polyunsaturated_fat_g,
        saturated_fat_g: foodData?.saturated_fat_g,
      },
      cholesterol_mg: foodData?.cholesterol_mg,
    };
    try {
      const resp = await apiCaller(token).post('/nutrition/food', apiData);
      if(resp.status === 200){
        this.allFood.customizedFoodList.push(response.data);
      }
    } catch (error) {
      console.error('Error adding custom food:', error);
    }
  }

  @action
  async deleteCustomFood(foodId, token) {
    try {
      const resp = await apiCaller(token).delete(`/nutrition/food/${foodId}`);
      if (resp.status === 200) {
        this.allFood.customizedFoodList = this.allFood.customizedFoodList.filter(
          (food) => food.id !== foodId
        );
      }
    } catch (error) {
      console.error(`Error deleting foodid - : ${foodId}`, error);
    }
  }

  @action
  async deleteMeal(mealId, token) {
    try {
      const resp = await apiCaller(token).delete(`/nutrition/meal/${mealId}`);
      if (resp.status === 200) {
        this.allFood.mealList = this.allFood.mealList.filter(
          (food) => food.id !== foodId
        );
      }
    } catch (error) {
      console.error(`Error deleting foodid - : ${foodId}`, error);
    }
  }

  @action
  async updateCustomFood(foodId, updatedData, token) {
    // TODO: Format not as per backend API
    try {
      const resp = await apiCaller(token).put(`/nutrition/food/${foodId}`, { ...updatedData });
      if (resp.status === 200) {
        this.allFood.customizedFoodList = this.allFood.customizedFoodList.map((food) =>
        food.id === foodId ? { ...food, ...updatedData } : food
      );
      }
    } catch (error) {
      console.error(`Error updating meal - : ${foodId}`, error);
    }
  }

  @action
  async updateMeal(mealId, updatedData, token) {
    // TODO: Format not as per backend API
    try {
      const resp = await apiCaller(token).put(`/nutrition/meal/${mealId}`, { ...updatedData });
      if (resp.status === 200) {
        this.allFood.mealList = this.allFood.mealList.map((food) =>
          food.id === mealId ? { ...food, ...updatedData } : food
        );
      }
    } catch (error) {
      console.error(`Error updating meal - : ${mealId}`, error);
    }
  }
}