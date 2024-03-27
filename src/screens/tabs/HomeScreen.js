
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFoods} from '../../services/NutritionApis/NutritionLogApi';
import {allFoodData} from '../../../store/action';
import { useEffect } from 'react';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.counter.isLoggedIn);
  const token = useSelector(state => state.counter.userToken);
  const allFood = useSelector(state => state.counter.allFood);
  console.log('this is from store ---====== food data', allFood);

  console.log('loged in', isLoggedIn);
  console.log('token======', token);
  const fetchFoods = async () => {
    console.log("i came here")
    try {
      const food = await getAllFoods(token);
      dispatch(allFoodData(food));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="get all food" onPress={fetchFoods}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
