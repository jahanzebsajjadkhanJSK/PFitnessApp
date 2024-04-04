import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { appThemeColors } from '../../utils/theme'
import { useStores } from '../../store/useStores'

const screenWidth = Dimensions.get('window').width

const HomeScreen = ({ navigation }) => {
  const { nutritionStore, userStore: { token } } = useStores()
  const allFood = nutritionStore.allFood
  const customFoods = allFood?.customizedFoodList
  const mealList = allFood?.mealList

  const [modalVisible, setModalVisible] = useState(false)
  const [update, setUpdate] = useState('false')
  const [showMeal, setShowMeal] = useState(false)
  const [customFoodShow, setCustomFoodShow] = useState(false)

  const [foodData, setFoodData] = useState({
    name: '',
    quantity: '',
    energy_kcal: '',
    glucose: '',
    fructose: '',
    fibre: '',
    protein_g: '',
    unsaturated_fat_g: '',
    polyunsaturated_fat_g: '',
    saturated_fat_g: '',
    cholesterol_mg: ''
  })

  const renderFoodItems = (foodList, meal) => {
    console.log('this is the object for flatlist ', foodList)
    return (
      <FlatList
        data={foodList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.itemContainer,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: appThemeColors.backgroundGrey
            }}>
            <View>
              <Text style={{ color: 'white' }}>{item.name}</Text>
              {meal === false && (
                <>
                  <Text style={{ color: 'white' }}>Quantity: {item?.quantity}</Text>
                  <Text style={{ marginBottom: 10, color: 'white' }}>
                    Energy: {item?.energy_kcal}
                  </Text>
                </>
              )}
            </View>
            <View>
              <Button title="Delete" onPress={() => meal === false ? handleDelete(item.id) : handleDeleteMeal(item.id)} />
              <Button
                title="Update"
                onPress={() =>
                  meal === false
                    ? handleUpdate(item.id, {
                      name: 'Green Team'
                    })
                    : handleMealUpdate(item.id, {
                      name: 'light dinner updated',
                      foodList: [
                        {
                          quantity: 1,
                          foodId: '8b2cc3a3-47e1-4d0f-a04e-110444ea816c',
                          isCustom: true,
                          action: 'delete',
                          id: '5fa46d64-eacb-43fd-8d9a-d84ad11bebe4'
                        },
                        {
                          quantity: 2,
                          foodId: '8b2cc3a3-47e1-4d0f-a04e-110444ea816c',
                          isCustom: true,
                          action: 'add'
                        },
                        {
                          quantity: 2,
                          foodId: '8b2cc3a3-47e1-4d0f-a04e-110444ea816c',
                          isCustom: true,
                          action: 'delete',
                          id: '488e1bbd-89c4-4e38-a94c-9371dfdf8d71'
                        }
                      ]
                    })
                }
              />
            </View>
          </View>
        )}
      />
    )
  }

  const customFoodModaldata = [
    { placeholder: 'Food Name', key: 'name' },
    { placeholder: 'Quantity', key: 'quantity' },
    { placeholder: 'Energy', key: 'energy_kcal' },
    { placeholder: 'Glucose', key: 'glucose' },

    { placeholder: 'Glucose', key: 'fructose' },
    { placeholder: 'Fibre', key: 'fibre' },
    { placeholder: 'Protein', key: 'protein_g' },
    { placeholder: 'Unsaturated Fat', key: 'unsaturated_fat_g' },

    { placeholder: 'Polysaturated Fat', key: 'polyunsaturated_fat_g' },
    { placeholder: 'Saturated Fat', key: 'saturated_fat_g' },
    { placeholder: 'Cholestrol', key: 'cholesterol_mg' }
  ]

  const renderItem = ({ item }) => (
    <TextInput
      style={styles.input}
      placeholder={item.placeholder}
      placeholderTextColor="grey"
      onChangeText={value => handleInputChange(item.key, value)}
      value={foodData[item.key]}
    />
  )

  const modalListComponent = data => (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={item => item.key}
      renderItem={renderItem}
      contentContainerStyle={styles.scrollViewContent}
    />
  )
  const fetchFoods = async () => {
    try {
      await nutritionStore.getAllFoods(token)
    } catch (error) {
      console.error(error.response.data)
    }
  }
  const handleDelete = async id => {
    try {
      await nutritionStore.deleteCustomFood(id, token)
      setUpdate('true')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteMeal = async id => {
    try {
      await nutritionStore.deleteMeal(id, token)
      setUpdate('true')
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async (id, updatedData) => {
    try {
      await nutritionStore.updateCustomFood(id, updatedData, token)
      setUpdate('true')
    } catch (error) {
      console.log('9090', error)
    }
  }

  const handleMealUpdate = async (id, updatedData) => {
    try {
      await nutritionStore.updateMeal(id, updatedData, token)
      setUpdate('true')
    } catch (error) {
      console.log('9090', error)
    }
  }

  useEffect(() => {
    if (update === 'true') {
      fetchFoods()
    }
    const focusListener = navigation.addListener('focus', () => {
      fetchFoods()
    })

    const blurListener = navigation.addListener('blur', () => {
      fetchFoods()
    })
    setUpdate('false')
    console.log('in use effect')

    return () => {
      focusListener()
      blurListener()
    }
  }, [update])

  const handleInputChange = (key, value) => {
    setFoodData({ ...foodData, [key]: value })
  }
  const handleSubmit = async () => {
    try {
      await nutritionStore.addCustomFood(foodData, token)
      setUpdate('true')
    } catch (error) {
      console.log(error)
    }

    setFoodData({
      name: '',
      quantity: '',
      energy_kcal: '',
      glucose: '',
      fructose: '',
      fibre: '',
      protein_g: '',
      unsaturated_fat_g: '',
      polyunsaturated_fat_g: '',
      saturated_fat_g: '',
      cholesterol_mg: ''
    })
    setModalVisible(false)
  }

  return (
    <View style={{ ...styles.container, backgroundColor: appThemeColors.backgroundBlack }}>
      <Text>Home Screen</Text>
      {/* <Button title="ADD CUSTOM FOOD" onPress={addCustomFood}></Button> */}
      <Button title="Enter Custom Food" onPress={() => setModalVisible(true)} />
      <View style={{ marginTop: 10 }}>
      <Button
        title="Show Custom Food "
        onPress={() => setCustomFoodShow(!customFoodShow)}
      />
      </View>
      {customFoodShow && (!customFoods || customFoods.length === 0
        ? (
        <View style={{ borderWidth: 1 }}>
          <Text style={{ color: 'black' }}>No custom food entered yet</Text>
        </View>
          )
        : (
            renderFoodItems(customFoods, false)
          ))}
      <View style={{ marginTop: 10 }}>
      <Button title="Show meals " onPress={() => setShowMeal(!showMeal)} />
      </View>
      {showMeal && renderFoodItems(mealList, true)}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {modalListComponent(customFoodModaldata)}
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContent: {
    width: screenWidth,
    borderWidth: 1,
    // flexGrow: 1,
    // backgroundColor:appThemeColors.backgroundGrey,
    justifyContent: 'center'
  },
  itemContainer: {
    flex: 1,
    width: screenWidth,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    color: 'white',
    backgroundColor: appThemeColors.backgroundGrey
  }
})

export default observer(HomeScreen)
