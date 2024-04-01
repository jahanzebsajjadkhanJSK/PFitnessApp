import Config from "react-native-config";

export const BASE_URL = Config.BASE_URL;


export const ADD_NUTRITION_LOG = BASE_URL + "/nutrition/log";    // METHOD POST 
export const GET_DAILY_LOG = BASE_URL + "/nutrition/day-log/";  //nutrition/day-log/2024-03-25 add daate
export const UPDATE_FOOD_LOG = BASE_URL + "/nutrition/log/";    //nutrition/log/1  METHOD PUT
export const DELETE_FOOD_LOG = BASE_URL + "/nutrition/log";     //nutrition/log/5   METHOD DELETE


// CUSTOM FOOD
export const ADD_CUSTOM_FOOD = BASE_URL + "/nutrition/food";   // METHOD POST
// export const UPDATE_CUSTOM_FOOD = BASE_URL + "/nutrition/food/"; ///nutrition/food/87783423-4751-4f3a-b68a-33971d5c57cf METHOD PUT
export const DELETE_CUSTOM_FOOD = BASE_URL + "/nutrition/food";  ///nutrition/food/b6eb97b6-bceb-41fb-8299-5e1cabae7e5a METHOD DELETE
export const ADD_CUSTOM_FOOD = BASE_URL + "/nutrition/all";
