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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllFoods,
  addCustomFood,
  updateCustomFood,
  deleteCustomFood,
} from '../../services/NutritionApis/NutritionLogApi';
import {
  allFoodData,
  deleteCustomFoodFromList,
  updateCustomFoodInList,
} from '../../../store/action';
import {useEffect} from 'react';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.counter.isLoggedIn);
  const token = useSelector(state => state.counter.userToken);
  const allFood = useSelector(state => state.counter.allFood);
  console.log('this is from store ---====== food data', allFood);
  const customFoods = allFood?.customizedFoodList;
  // console.log('this is from store ---====== food data', allFood);
  // console.log('this is from store ---======token', token);

  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState('false');

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
    console.log('i came here');
    try {
      const food = await getAllFoods(token);
      dispatch(allFoodData(food));
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async id => {
    try {
      await deleteCustomFood(id, token);
      dispatch(deleteCustomFoodFromList(id));
      console.log("now deleted")
      setUpdate('true') 
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, updatedData ) => {
    console.log("came to update from home 5454")
    try {
      await updateCustomFood(id, updatedData, token);
      
      
      console.log("now dispatching")
      dispatch(updateCustomFoodInList(id, updatedData)); 
      console.log("now dispatched")
      setUpdate('true')
    } catch (error) {
      console.log("9090",error);
    }
  };

  useEffect(() => {
    if(update === 'true'){
      fetchFoods()
    }
    const focusListener = navigation.addListener('focus', () => {
      fetchFoods();
    });

    const blurListener = navigation.addListener('blur', () => {
      fetchFoods();
    });
    setUpdate("false");
    console.log("in use effect")

    return () => {
      focusListener();
      blurListener();
    };
  }, [update]);

  const handleInputChange = (key, value) => {
    setFoodData({...foodData, [key]: value});
  };
console.log("update food store",update)
  const handleSubmit = async () => {
    console.log('Food Data:', foodData);
    try {
      const response = await addCustomFood(foodData, token);
      console.log(response);
      setUpdate('true')
    } catch (error) {
      console.log(error);
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
 
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* <Button title="ADD CUSTOM FOOD" onPress={addCustomFood}></Button> */}
      <Button title="Enter Custom Food" onPress={() => setModalVisible(true)} />
      {!customFoods || customFoods.length === 0 ? (
  <View style={{ borderWidth: 1 }}>
    <Text style={{ color: 'black' }}>No custom food entered yet</Text>
  </View>
) : (
        <FlatList
          data={customFoods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{...styles.itemContainer,flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text style={{marginBottom: 10}}>Energy: {item.energy_kcal}</Text>
              </View>
              <View>
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
              <Button
                title="Update"
                onPress={() =>
                  
                  handleUpdate(item.id, {
                    name: 'ROTI',
                  })
                }
              /></View>
            </View>
          )}
        />
      )}

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
              onChangeText={value =>
                handleInputChange('unsaturated_fat_g', value)
              }
              value={foodData.unsaturated_fat_g}
            />
            <TextInput
              style={styles.input}
              placeholder="Polyunsaturated Fat"
              onChangeText={value =>
                handleInputChange('polyunsaturated_fat_g', value)
              }
              value={foodData.polyunsaturated_fat_g}
            />
            <TextInput
              style={styles.input}
              placeholder="Saturated Fat"
              onChangeText={value =>
                handleInputChange('saturated_fat_g', value)
              }
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
  itemContainer: {
    flex:1,
    width:screenWidth,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
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
