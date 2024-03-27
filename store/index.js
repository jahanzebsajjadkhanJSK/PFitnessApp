// store/index.js
import {configureStore} from '@reduxjs/toolkit';

const initialState = {
  counter: 0, // Initial state for the counter
  userToken: '',
  isLoggedIn: false,
  allFood: {},
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
