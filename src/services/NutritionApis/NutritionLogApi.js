import axios from 'axios'; // Assuming you're using Axios for API calls
import {err} from 'react-native-svg';
import {useSelector} from 'react-redux';

const baseUrl = 'http://ec2-34-197-168-116.compute-1.amazonaws.com:5001'; // Replace with your actual API base URL

const authorizationHeader = () => {
  console.log('i casehere');
  return {
    Authorization: `Bearer ${getToken()}`, // Replace `getToken` with your token retrieval logic
  };
};

// ... Implement other authorization and login related functions here ...

export const addNutritionLog = async (data, token) => {
  const authHeader = {
    Authorization: `Bearer ${token}`, 
  };
  const url = `${baseUrl}/nutrition/log`;
  try {
    const response = await axios.post(url, data, {headers: authHeader});
    return response.data;
  } catch (error) {
    console.error(error.response.data)
    return error
  }
};

export const getDailyLog = async date => {
  const url = `${baseUrl}/nutrition/day-log/${date}`;
  const response = await axios.get(url, {headers: authorizationHeader()});
  return response.data;
};

export const updateFoodLog = async (logId, data) => {
  const url = `${baseUrl}/nutrition/log/${logId}`;
  const response = await axios.put(url, data, {headers: authorizationHeader()});
  return response.data;
};

export const deleteFoodLog = async logId => {
  const url = `${baseUrl}/nutrition/log/${logId}`;
  const response = await axios.delete(url, {headers: authorizationHeader()});
  return response.data;
};

export const addCustomFood = async (data, token) => {
  const authHeader = {
    Authorization: `Bearer ${token}`, // Replace `getToken` with your token retrieval logic
  };
  const apiData = {
    name: data.name,
    quantity: data.quantity,
    energy_kcal: data.energy_kcal,
    carbohydrates: {
      glucose: data.glucose,
      fructose: data.fructose,
      fibre: data.fibre,
    },
    protein_g: data.protein_g,
    fats: {
      unsaturated_fat_g: data.unsaturated_fat_g,
      polyunsaturated_fat_g: data.polyunsaturated_fat_g,
      saturated_fat_g: data.saturated_fat_g,
    },
    cholesterol_mg: data.cholesterol_mg,
  };
  console.log('hitting api with this foof data', apiData);
  const url = `${baseUrl}/nutrition/food`;
  const response = await axios.post(url, apiData, {
    headers: authHeader,
  });
  return response.data;
};

export const updateCustomFood = async (foodId, data) => {
  const url = `${baseUrl}/nutrition/food/${foodId}`;
  const response = await axios.put(url, data, {headers: authorizationHeader()});
  return response.data;
};

export const deleteCustomFood = async foodId => {
  const url = `${baseUrl}/nutrition/food/${foodId}`;
  const response = await axios.delete(url, {headers: authorizationHeader()});
  return response.data;
};

export const getAllFoods = async token => {
  const authHeader = {
    Authorization: `Bearer ${token}`, // Replace `getToken` with your token retrieval logic
  };
  console.log('this is the authorizationHeader', authHeader);
  const url = `${baseUrl}/nutrition/all`;
  const response = await axios.get(url, {headers: authHeader});
  return response.data;
};

// Helper function to retrieve the access token from storage/context (replace with your implementation)
function getToken() {
  console.log('in get token');
  // const token = useSelector(state=> state.counter.userToken)
  // Implement your logic to retrieve the access token from storage or context
  return token; // Replace with actual token retrieval
}
