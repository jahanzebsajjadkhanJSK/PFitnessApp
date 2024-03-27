// store/actions.js
export const increment = () => ({
    type: 'INCREMENT',
  });
  
  export const decrement = () => ({
    type: 'DECREMENT',
  });
  


  export const loginSuccess = (payload) => (
    {
    type: 'STORE_TOKEN',
    payload: payload
  });

  export const allFoodData = (payload) => (
    {
    type: 'ALL_FOOD_DATA',
    payload: payload
  });