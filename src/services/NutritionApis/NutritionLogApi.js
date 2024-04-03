import axios from 'axios' // Assuming you're using Axios for API calls
import { err } from 'react-native-svg'
import { useSelector } from 'react-redux'

const baseUrl = 'http://ec2-34-197-168-116.compute-1.amazonaws.com:5001' // Replace with your actual API base URL

const authorizationHeader = () => {
  console.log('i casehere')
  return {
    Authorization: `Bearer ${getToken()}` // Replace `getToken` with your token retrieval logic
  }
}

// ... Implement other authorization and login related functions here ...

export const addNutritionLog = async (data, token) => {
  const authHeader = {
    Authorization: `Bearer ${token}`
  }
  const url = `${baseUrl}/nutrition/log`
  try {
    const response = await axios.post(url, data, { headers: authHeader })
    return response.data
  } catch (error) {
    console.error(error.response.data)
    return error
  }
}

export const getDailyLog = async date => {
  const url = `${baseUrl}/nutrition/day-log/${date}`
  const response = await axios.get(url, { headers: authorizationHeader() })
  return response.data
}

export const updateFoodLog = async (logId, data) => {
  const url = `${baseUrl}/nutrition/log/${logId}`
  const response = await axios.put(url, data, { headers: authorizationHeader() })
  return response.data
}

export const deleteFoodLog = async logId => {
  const url = `${baseUrl}/nutrition/log/${logId}`
  const response = await axios.delete(url, { headers: authorizationHeader() })
  return response.data
}

export const addCustomFood = async (data, token) => {
  const authHeader = {
    Authorization: `Bearer ${token}` // Replace `getToken` with your token retrieval logic
  }
  const apiData = {
    name: data?.name,
    quantity: data?.quantity,
    energy_kcal: data?.energy_kcal,
    carbohydrates: {
      glucose: data?.glucose,
      fructose: data?.fructose,
      fibre: data?.fibre
    },
    protein_g: data?.protein_g,
    fats: {
      unsaturated_fat_g: data?.unsaturated_fat_g,
      polyunsaturated_fat_g: data?.polyunsaturated_fat_g,
      saturated_fat_g: data?.saturated_fat_g
    },
    cholesterol_mg: data?.cholesterol_mg
  }
  console.log('hitting api with this foof data', apiData)
  const url = `${baseUrl}/nutrition/food`
  try {
    const response = await axios.post(url, apiData, {
      headers: authHeader
    })
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
}

export const updateCustomFood = async (foodId, data, token) => {
  // console.log('6565',token)
  const authHeader = {
    Authorization: `Bearer ${token}` // Replace `getToken` with your token retrieval logic
  }
  console.log('came to update', foodId)
  const url = `${baseUrl}/nutrition/food/${foodId}`
  try {
    console.log('updating food ===with id', foodId)
    const response = await axios.put(url, data, { headers: authHeader })
    console.log('this is the response for update food', response.data)
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
}

export const deleteCustomFood = async (foodId, token) => {
  const authHeader = {
    Authorization: `Bearer ${token}` // Replace `getToken` with your token retrieval logic
  }
  const url = `${baseUrl}/nutrition/food/${foodId}`
  try {
    console.log('deleting food ===with id', foodId)
    const response = await axios.delete(url, { headers: authHeader })
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
}

export const addNewMeal = async (token) => {
  const url = `${baseUrl}/nutrition/meal`
  try {
    const response = await axios.post(
      url,
      {
        name: 'light dinner',
        foodList: [
          {
            quantity: 1,
            foodId: '1086ad22-8eb6-4630-ac60-ba3801ba61c6',
            isCustom: true
          },
          {
            quantity: 2,
            foodId: '05e0413b-aaf8-4515-ba13-2c5423594b62',
            isCustom: false
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error adding new meal:', error)
    throw error
  }
}

export const deleteMeal = async (mealId, token) => {
  const url = `${baseUrl}/nutrition/meal/${mealId}`
  console.log('this is meal id in api', mealId)
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting meal:', error.response.data)
    throw error
  }
}

export const updateMeal = async (mealId, updatedData, token) => {
  const url = `${baseUrl}/nutrition/meal/${mealId}`

  try {
    const response = await api.put(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating meal:', error)
    throw error
  }
}

export const getAllFoods = async token => {
  const authHeader = {
    Authorization: `Bearer ${token}` // Replace `getToken` with your token retrieval logic
  }
  // console.log('this is the authorizationHeader', authHeader);
  const url = `${baseUrl}/nutrition/all`
  try {
    const response = await axios.get(url, { headers: authHeader })
    console.log('this is all fod response', response.data)
    return response.data
  } catch (error) {
    error.response.data
  }
}

// Helper function to retrieve the access token from storage/context (replace with your implementation)
function getToken () {
  console.log('in get token')
  // const token = useSelector(state=> state.counter.userToken)
  // Implement your logic to retrieve the access token from storage or context
  return token // Replace with actual token retrieval
}
