// store/actions.js
export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});

export const deleteCustomFoodFromList = id => ({
  type: 'DELETE_CUSTOM_FOOD',
  payload: id,
});
export const deleteMealFromList = id => ({
  type: 'DELETE_MEAL',
  payload: id,
});

export const updateCustomFoodInList = (id, updatedData) => ({
  type: 'UPDATE_CUSTOM_FOOD',
  payload: {id, updatedData},
});
export const updateMealInList = (id, updatedData) => ({
  type: 'UPDATE_MEAL',
  payload: {id, updatedData},
});

export const loginSuccess = payload => ({
  type: 'STORE_TOKEN',
  payload: payload,
});

export const allFoodData = payload => ({
  type: 'ALL_FOOD_DATA',
  payload: payload,
});
