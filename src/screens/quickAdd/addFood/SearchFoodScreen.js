import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import {Searchbar, IconButton} from 'react-native-paper';
import {observer} from 'mobx-react';

import CategoryFilters from '../../../utils/Helpers/CategoryFilters';
import {appThemeColors} from '../../../utils/theme';
import {useStores} from '../../../store/useStores';
import SearchListView from '../../../components/SearchListView';

const SearchFoodScreen = ({navigation}) => {
  const {
    nutritionStore,
    userStore: {token},
  } = useStores();
  const allFood = nutritionStore.allFood;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Search');
  const [filteredFood, setFilteredFood] = useState(allFood);
  const [showAllData, setShowAllData] = useState(true);
  const [allFoodArray, setAllFoodArray] = useState({});
  const collectNames = {};
  const dataBySelectedCategory = {
    Search: allFoodArray,
    Barcode: '',
    'Custom Foods': allFood.customizedFoodList,
    Favourites: '',
    'Quick Add': '',
    Brands: '',
  };

  function retrieveEntry(selectedId) {
    console.log('i m here', selectedId);
    const data = nutritionStore.allFood;

    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        if (Array.isArray(data[key])) {
          const entry = data[key].find(item => item.id === selectedId);
          if (entry) {
            if (key === 'customizedFoodList') {
              entry.isCustom = true;
            }
            return entry;
          }
        } else {
          const entry = retrieveEntry(selectedId, data[key]);
          if (entry) {
            return entry;
          }
        }
      }
    }

    return null;
  }

  const addLog = async selectedId => {
    const selectedFoodObject = retrieveEntry(selectedId);
    const apiData = {
      foodId: selectedFoodObject.id,
      consumedAt: new Date(),
      quantity: 3,
      isCustom: selectedFoodObject.isCustom,
      isMeal: false,
    };
    // console.log(token);
    try {
      const response = await nutritionStore.addNutritionLog(apiData, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchAllFoods() {
    console.log('getting all food');
    try {
      await nutritionStore.getAllFoods(token);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    if (Object.keys(allFood).length === 0) {
      fetchAllFoods();
    }
    const searchTimer = setTimeout(() => {
      const nameData = obj => {
        const names = [];
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
              obj[key].forEach(item => {
                if (item.id) {
                  names.push(item);
                }
              });
            } else {
              console.log('this is form collect names,1212');

              names.push(...nameData(obj[key]));
            }
          }
        }
        console.log('3323', names);

        return names;
      };

      setAllFoodArray(nameData(nutritionStore.allFood));
      console.log('these are the names ', nameData(nutritionStore.allFood));
      const filteredFoodData = nameData(nutritionStore.allFood).filter(food =>
        food.name?.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      console.log('8989', filteredFoodData);
      setFilteredFood(filteredFoodData);
    }, 0);

    return () => clearTimeout(searchTimer); // Clear timer on cleanup
  }, [searchQuery, nutritionStore.allFood]);

  const handleClear = () => {};

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      {/* ... */}

      {/* Header */}
      <View style={{...styles.header}}>
        <Searchbar
          placeholder="Search all foods..."
          style={{backgroundColor: '#303944'}}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={'white'}
        />

        <CategoryFilters
          tags={[
            'Search',
            'Barcode',
            'Custom Foods',
            'Favourites',
            'Quick Add',
            'Brands',
          ]}
          activeCategory={activeCategory}
          setActiveCategory={val => {
            setActiveCategory(val);
          }}
        />
      </View>
      {filteredFood && (
      SearchListView(searchQuery , filteredFood , dataBySelectedCategory[activeCategory])
      )}

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>
          Example for redux implementation = Count: {nutritionStore.count}
        </Text>
        <Button title="Increase" onPress={() => nutritionStore.increment()} />
        <Button title="Decrease" onPress={() => nutritionStore.decrement()} />
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
    backgroundColor: appThemeColors.backgroundTertiary,
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

export default observer(SearchFoodScreen);
