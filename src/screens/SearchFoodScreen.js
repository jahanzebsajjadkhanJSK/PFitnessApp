import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import Config from 'react-native-config';
import {Searchbar} from 'react-native-paper';
import CategoryFilters from '../utils/Helpers/CategoryFilters';
import {appThemeColors} from '../utils/theme';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
// import { increaseCounter, decreaseCounter } from '../store/actions'; // Adjust path as needed
import {decrement, increment} from '../../store/action';

const SearchFoodScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const count = useSelector(state => state.counter); // Access state from store
  const allFood = useSelector(state => state.counter.allFood);
  console.log('this is all food ===---', allFood);
  const [filteredFood, setFilteredFood] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const filteredFoodData = allFood.customizedFoodList.filter(food =>
        food.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      setFilteredFood(filteredFoodData);
      // Update UI with filteredFood (e.g., render FlatList)
      // ...
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(searchTimer); // Clear timer on cleanup
  }, [searchQuery, allFood]);

  const handleClear = () => {};
  const myurl = Config.BASE_URL;
  // console.log("this is count value",count)
  console.log(myurl);
  // useEffect(() => {
  // 	const backButtonListener = navigation.addListener('beforeRemove', (e) => {
  // 		// Check if the user wants to exit the app
  // 		if (!e.data.action.type === 'Navigation/BACK') {
  // 			return;
  // 		}

  // 		// Navigate back to top if hardware back button pressed
  // 		navigation.popToTop();
  // 	});

  // 	return backButtonListener;
  // }, [navigation]);
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      {/* ... */}

      {/* Header */}
      <View style={{...styles.header}}>
        <Searchbar
          placeholder="Search"
          style={{backgroundColor: 'grey'}}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={'white'}
          right={() => (
            <IconButton icon="thermometer" onPress={handleClear} /> // Custom right-side element
          )}
        />
     
        <CategoryFilters
          tags={[
            'All',
            'Favourite',
            'Custom',
            'Commom',
            'Supliments',
            'Brands',
          ]}
          activeCategory={activeCategory}
          setActiveCategory={val => {
            setActiveCategory(val);
          }}
        />

        {/* <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>Category 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>Category 2</Text>
          </TouchableOpacity>
          {/* Add more category tags as needed */}
        {/* </View>  */}
      </View>
      {filteredFood && (
          <FlatList
            data={filteredFood}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{backgroundColor: 'white', alignItems: 'center'}}
                onPress={() => {
                  // Handle food item press (e.g., navigate to details screen)
                }}>
                <Text style={{color: 'red'}}>{item.name}</Text>
                {/* Add more item details as needed */}
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id} // Assuming each food item has a unique ID
          />
        )}

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>
          Example for redux implementation = Count: {count.counter}
        </Text>
        <Button title="Increase" onPress={() => dispatch(increment())} />
        <Button title="Decrease" onPress={() => dispatch(decrement())} />
      </View>

      {/* Rest of the screen content */}
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColors.backgroundBlack,
  },
  header: {
    paddingHorizontal: 16,
    // paddingVertical: 12,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: appThemeColors.backgroundGrey,
    // borderBottomColor: "grey" ,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  categoryTag: {
    backgroundColor: '#e3e3e3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  categoryText: {
    color: '#333',
  },
});

export default SearchFoodScreen;
