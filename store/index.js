// store/index.js
import {configureStore} from '@reduxjs/toolkit';

const initialState = {
  counter: 0, // Initial state for the counter
  userToken: '',
  isLoggedIn: false,
  allFood: {},
  dailyLog: {},
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    case 'STORE_TOKEN':
      return {
        ...state,
        userToken: action.payload,
        isLoggedIn: true,
      };
    case 'ALL_FOOD_DATA':
      return {
        ...state,
        allFood: action.payload,
      };
      case 'DELETE_CUSTOM_FOOD':
        return {
          ...state,
          allFood: {
            ...state.allFood,
            customizedFoodList: state.allFood.customizedFoodList.filter(
              (food) => food.id !== action.payload
            ),
          },
        }
        case 'DELETE_MEAL':
          return {
            ...state,
            allFood: {
              ...state.allFood,
              mealList: state.allFood.mealList.filter(
                (food) => food.id !== action.payload
              ),
            },
          }
        case 'UPDATE_CUSTOM_FOOD':
      return {
        ...state,
        allFood: {
          ...state.allFood,
          customizedFoodList: state.allFood.customizedFoodList.map((food) =>
            food.id === action.payload.id ? { ...food, ...action.payload.updatedData } : food
          ),
        },
      };
      case 'UPDATE_MEAL':
        return {
          ...state,
          allFood: {
            ...state.allFood,
            mealList: state.allFood.mealList.map((food) =>
              food.id === action.payload.id ? { ...food, ...action.payload.updatedData } : food
            ),
          },
        };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    counter: counterReducer, // Register the counter reducer
  },
});

export default store;
