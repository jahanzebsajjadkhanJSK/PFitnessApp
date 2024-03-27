import {View, Text, StyleSheet, Button, Modal, TextInput, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFoods ,addCustomFood} from '../../services/NutritionApis/NutritionLogApi';
import {allFoodData} from '../../../store/action';
import {useEffect} from 'react';
import React, { useState } from 'react';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.counter.isLoggedIn);
  const token = useSelector(state => state.counter.userToken);
  const allFood = useSelector(state => state.counter.allFood);
  console.log('this is from store ---====== food data', allFood);
  console.log('this is from store ---======token', token);



  const [modalVisible, setModalVisible] = useState(false);
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
    cholesterol_mg: '',
  });
  const fetchFoods = async () => {
    console.log("i came here")
    try {
      const food = await getAllFoods(token);
      dispatch(allFoodData(food));
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchFoods();
  }, []);

  const handleInputChange = (key, value) => {
    setFoodData({...foodData, [key]: value});
  };

  const handleSubmit =  async () => {
    // Perform the API request with foodData object
    console.log('Food Data:', foodData);
    try {
      const response = await addCustomFood(foodData,token)
      console.log(response)
    }catch(error){
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
      cholesterol_mg: '',
    });
    setModalVisible(false);
  };

  console.log('loged in', isLoggedIn);
  // console.log('token======', token);
 
  // useEffect(() => {
  //   fetchFoods();
  // }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* <Button title="ADD CUSTOM FOOD" onPress={addCustomFood}></Button> */}
      <Button
        title="Enter Custom Food"
        onPress={() => setModalVisible(true)}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextInput
            style={styles.input}
            placeholder="Food Name"
            onChangeText={value => handleInputChange('name', value)}
            value={foodData.name}
          />
           <TextInput
            style={styles.input}
            placeholder="Quantity"
            onChangeText={value => handleInputChange('quantity', value)}
            value={foodData.quantity}
          />
           <TextInput
            style={styles.input}
            placeholder="Energy"
            onChangeText={value => handleInputChange('energy_kcal', value)}
            value={foodData.energy_kcal}
          />
           <TextInput
            style={styles.input}
            placeholder="Glucose"
            onChangeText={value => handleInputChange('glucose', value)}
            value={foodData.glucose}
          />
           <TextInput
            style={styles.input}
            placeholder="Fructose"
            onChangeText={value => handleInputChange('fructose', value)}
            value={foodData.fructose}
          />
           <TextInput
            style={styles.input}
            placeholder="Fibre"
            onChangeText={value => handleInputChange('fibre', value)}
            value={foodData.fibre}
          />
           <TextInput
            style={styles.input}
            placeholder="Protien"
            onChangeText={value => handleInputChange('protein_g', value)}
            value={foodData.protein_g}
          />
           <TextInput
            style={styles.input}
            placeholder="Unsaturated Fat"
            onChangeText={value => handleInputChange('unsaturated_fat_g', value)}
            value={foodData.unsaturated_fat_g}
          />
           <TextInput
            style={styles.input}
            placeholder="Polyunsaturated Fat"
            onChangeText={value => handleInputChange('polyunsaturated_fat_g', value)}
            value={foodData.polyunsaturated_fat_g}
          />
           <TextInput
            style={styles.input}
            placeholder="Saturated Fat"
            onChangeText={value => handleInputChange('saturated_fat_g', value)}
            value={foodData.saturated_fat_g}
          />
           <TextInput
            style={styles.input}
            placeholder="Cholestrol"
            onChangeText={value => handleInputChange('cholesterol_mg', value)}
            value={foodData.cholesterol_mg}
          />
          </ScrollView>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default HomeScreen;
