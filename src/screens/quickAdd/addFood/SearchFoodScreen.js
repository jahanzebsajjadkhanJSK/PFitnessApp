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
import {Searchbar} from 'react-native-paper';
import CategoryFilters from '../../../utils/Helpers/CategoryFilters';
import {appThemeColors} from '../../../utils/theme';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
// import { increaseCounter, decreaseCounter } from '../store/counterReducer'; // Adjust path as needed
import {decrement, increment} from '../../../store/counterReducer';
import {addNutritionLog} from '../../../services/NutritionApis/NutritionLogApi';

const SearchFoodScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const token = useSelector(state => state.counter.userToken);

  const [activeCategory, setActiveCategory] = useState('All');
  const count = useSelector(state => state.counter); // Access state from store
  const allFood = useSelector(state => state.counter.allFood);
  console.log('this is all food ===---', allFood);
  const [filteredFood, setFilteredFood] = useState('');
  const dispatch = useDispatch();

  function retrieveEntry(selectedId) {
    console.log('i m here', selectedId);
    const data = allFood;

    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        if (Array.isArray(data[key])) {
          const entry = data[key].find(item => item.id === selectedId);
          if (entry) {
            if (key == 'customizedFoodList') {
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
      const response = await addNutritionLog(apiData, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const nameData = obj => {
        const names = [];
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
              obj[key].forEach(item => {
                if (item.name) {
                  names.push({name: item.name, id: item.id});
                }
              });
            } else {
              names.push(...collectNames(obj[key]));
            }
          }
        }

        return names;
      };

      console.log('these are the names ', nameData(allFood));
      const filteredFoodData = nameData(allFood).filter(food =>
        food.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      console.log('8989', filteredFoodData);
      setFilteredFood(filteredFoodData);
    }, 0);

    return () => clearTimeout(searchTimer); // Clear timer on cleanup
  }, [searchQuery, allFood]);

  const handleClear = () => {};
  const myurl = Config.BASE_URL;
  // console.log("this is count value",count)
  console.log(myurl);

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
      </View>
      {filteredFood && (
        <FlatList
          data={filteredFood}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderBottomWidth: 2,
                height: 50,
                borderBottomColor: 'grey',
              }}
              onPress={() => {
                Alert.alert(
                  'Confirmation',
                  `Are you sure you want to select "${item.name}"?`,
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'OK',
                      onPress: () => {
                        addLog(item.id);
                      },
                    },
                  ],
                );
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: appThemeColors.backgroundGrey,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>{item.name}</Text>
              </View>
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
