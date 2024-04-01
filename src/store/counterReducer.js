import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
  userToken: '',
  isLoggedIn: false,
  allFood: {},
  dailyLog: {}
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
    decrement: (state) => {
      state.counter -= 1
    },
    storeToken: (state, action) => {
      state.userToken = action.payload
      state.isLoggedIn = true
    },
    allFoodData: (state, action) => {
      state.allFood = action.payload
    },
    deleteCustomFoodFromList: (state, action) => {
      state.allFood.customizedFoodList = state.allFood.customizedFoodList.filter(
        (food) => food.id !== action.payload
      )
    },
    deleteMealFromList: (state, action) => {
      state.allFood.mealList = state.allFood.mealList.filter(
        (food) => food.id !== action.payload
      )
    },
    updateCustomFoodInList: (state, action) => {
      state.allFood.customizedFoodList = state.allFood.customizedFoodList.map((food) =>
        food.id === action.payload.id ? { ...food, ...action.payload.updatedData } : food
      )
    },
    updateMealInList: (state, action) => {
      state.allFood.mealList = state.allFood.mealList.map((food) =>
        food.id === action.payload.id ? { ...food, ...action.payload.updatedData } : food
      )
    }

  }
})

export const { increment, decrement, storeToken, allFoodData, deleteCustomFoodFromList, deleteMealFromList, updateCustomFoodInList, updateMealInList } = counterSlice.actions

export default counterSlice.reducer
