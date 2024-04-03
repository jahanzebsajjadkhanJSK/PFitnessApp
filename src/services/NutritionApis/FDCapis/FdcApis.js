import axios from 'axios'
import Config from 'react-native-config'

const fdcApiKey = Config.FdcApiKey
console.log('this is the fddcapikey  989898', fdcApiKey)

const fdcBaseUrl = 'https://api.nal.usda.gov/fdc/v1'

export const fdcApi = {
  getFoodList: () => {
    const pageNumber = 1
    const pageSize = 100
    const url = `${fdcBaseUrl}/foods/list?dataType=Survey%20%28FNDDS%29&pageSize=${pageSize}&pageNumber=${pageNumber}&api_key=${fdcApiKey}`
    return axios.get(url)
  },
  searchFoodsUsingBody: (query, dataType, pageSize, pageNumber) => {
    const url = `${fdcBaseUrl}/foods/search?api_key=${fdcApiKey}`
    const body = {
      query,
      dataType: [dataType],
      pageSize,
      pageNumber
    }
    return axios.post(url, body)
  },
  searchFoodsUsingQueryParams: (query, dataType, pageSize, pageNumber, sortBy, sortOrder) => {
    const url = `${fdcBaseUrl}/foods/search?query=${encodeURIComponent(query)}&dataType=${encodeURIComponent(dataType)}&pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}&sortOrder=${sortOrder}&api_key=${fdcApiKey}`
    return axios.get(url)
  },
  multipleFoodDetails: (fdcIds) => {
    const url = `${fdcBaseUrl}/foods?fdcIds=${fdcIds.join('&fdcIds=')}&api_key=${fdcApiKey}`
    return axios.get(url)
  },
  singleFoodDetail: (fdcId) => {
    const url = `${fdcBaseUrl}/food/${fdcId}?api_key=${fdcApiKey}`
    return axios.get(url)
  }
}

const openFoodFactsBaseUrl = 'https://world.openfoodfacts.org'

export const offApi = {
  searchFood: (searchTerms) => {
    const url = `${openFoodFactsBaseUrl}/cgi/search.pl?search_terms=${searchTerms}&search_simple=1&json=1`
    return axios.get(url)
  },
  searchViaBarcode: (barcode) => {
    const url = `${openFoodFactsBaseUrl}/api/v2/product/${barcode}`
    return axios.get(url)
  }
}
