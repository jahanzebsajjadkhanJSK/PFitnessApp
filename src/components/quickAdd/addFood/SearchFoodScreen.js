import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
  Dropdown,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SelectDropdown from 'react-native-select-dropdown';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import * as Progress from 'react-native-progress';
import Config from 'react-native-config';
import {Searchbar, IconButton} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {observer} from 'mobx-react';

import CategoryFilters from '../../CategoryFilters';
import {appThemeColors} from '../../../utils/theme';
import {useStores} from '../../../store/useStores';
import SearchListView from '../../SearchListView';
import FoodLogModal from '../../FoodLogModal';
// import GradientButton from '../../../utils/GradientButton';
import {fontStyles} from '../../../utils/theme';
import GradientButton from '../../GradientButton';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const collectNames = {};
  const dataBySelectedCategory = {
    Search: allFoodArray,
    Barcode: '',
    'Custom Foods': allFood.customizedFoodList,
    Favourites: '',
    'Quick Add': '',
    Brands: '',
  };
  ////////////////////
  const bottomSheetModalRef = useRef(null);
  const servingRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '97%'], []);

  // callbacks
  const handlePresentModalPress = itemId => {
    bottomSheetModalRef.current?.present();
    setLogData(retrieveEntry(itemId));
    console.log('this is the logged item0909', logData);
  };
  const handleCloseModalPress = itemId => {
    bottomSheetModalRef.current?.dismiss();
    console.log('this is close bottom sheet ');
    navigation.navigate('Food Diary');
  };
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const [amount, setAmount] = useState(0); // Initial amount
  const [servingSize, setServingSize] = useState(''); // Initial serving size
  const [dropdownData, setDropdownData] = useState([]); // Data for dropdown
  const [logData, setLogData] = useState('');
  // Get dropdown data (replace with your actual data fetching logic)
  useEffect(() => {
    const servingSizeData = [
      {label: 'bar - 60g', value: 'bar-60g'},
      {label: 'cup - 250ml', value: 'cup-250ml'},
      // Add more serving sizes here
    ];
    setDropdownData(servingSizeData);
  }, []);

  // Get current date

  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleAmountChange = text => {
    const parsedAmount = parseFloat(text);
    if (!isNaN(parsedAmount)) {
      setAmount(parsedAmount);
    }
  };

  const handleDropdownChange = value => {
    setServingSize(value);
  };
  ///////////////////

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
    console.log('this is the selected food id', selectedFoodObject);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appThemeColors.backgroundPrimary,
      }}>
      <StatusBar
        backgroundColor={appThemeColors.backgroundSecondary}
        barStyle="light-content"
      />
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
        {filteredFood &&
          SearchListView(
            searchQuery,
            filteredFood,
            dataBySelectedCategory[activeCategory],
            handlePresentModalPress,
          )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetScrollView style={styles.contentContainer}>
            <View>
              <View>
                <Text style={styles.description}>
                  {logData.foodDescription}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.container,
                borderColor: '#344760',
                borderWidth: 1,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: '#344760',
                  borderBottomWidth: 1,
                  paddingTop: 10,

                  paddingLeft: 22,
                }}>
                <Text style={{...styles.text, paddingBottom: 10}}>Amount:</Text>
                <TextInput
                  style={{...styles.input, textAlign: 'right'}}
                  keyboardType="numeric"
                  value={amount.toString()}
                  onChangeText={handleAmountChange}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: '#344760',
                  borderWidth: 1,
                  paddingTop: 10,
                  paddingLeft: 22,
                  paddingBottom: 10,
                }}>
                <Text style={styles.text}>Serving Size:</Text>

                <View
                  style={{
                    width: 72,
                    height: 21,
                    marginRight: 34,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        ...fontStyles.poppinsNormal12300,
                        color: '#B0B0B0',
                      }}>
                      {' '}
                      bar-60g{' '}
                    </Text>
                    <Image
                      source={require('../../../assets/Arrow_drop_down_big.png')}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 22,
                  paddingVertical: 14,
                }}>
                <Text style={styles.text}>Timestamp:</Text>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      paddingTop: 2,
                      paddingHorizontal: 5,
                      backgroundColor: appThemeColors.backgroundInput,
                      borderRadius: 4,
                    }}>
                    <Text style={styles.text}>{formattedTime}</Text>
                  </View>
                  <Image
                    source={require('../../../assets/Check_fill.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                paddingTop: 10,
                paddingBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                Nutritional Information per [INSERT SERVING]
              </Text>

              <Text style={{color: 'white'}}>
                Data Source: [SOURCE DATABASE]
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#344760',
                borderRadius: 15,
                paddingBottom: 27,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 17,
                  paddingTop: 14,
                }}>
                <Text style={{color: 'white'}}>Energy Summary</Text>
                <Text style={{color: 'white'}}>^</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingTop: 17,
                }}>
                <View style={{alignItems: 'center', position: 'relative'}}>
                  <Text style={{color: 'white', paddingBottom: 9}}>
                    proteins
                  </Text>
                  <AnimatedCircularProgress
                    size={70}
                    width={5}
                    fill={70}
                    tintColor={appThemeColors.progressBarGreen}
                    rotation={220}
                    lineCap="round"
                    arcSweepAngle={280}
                    backgroundColor="grey"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: 18,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: '300',
                      }}>
                      {logData.protein_g * 1000}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: appThemeColors.textColorGrey,
                        alignSelf: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.17,
                      }}>
                      cal
                    </Text>
                  </View>
                </View>

                <View style={{alignItems: 'center', position: 'relative'}}>
                  <Text style={{color: 'white', paddingBottom: 9}}>carbs</Text>
                  <AnimatedCircularProgress
                    size={70}
                    width={5}
                    fill={70}
                    tintColor={appThemeColors.progressBarOrange}
                    rotation={220}
                    lineCap="round"
                    arcSweepAngle={280}
                    backgroundColor="grey"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: 18,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: '300',
                      }}>
                      810
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: appThemeColors.textColorGrey,
                        alignSelf: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.17,
                      }}>
                      cal
                    </Text>
                  </View>
                </View>

                <View style={{alignItems: 'center', position: 'relative'}}>
                  <Text style={{color: 'white', paddingBottom: 9}}>Fats</Text>
                  <AnimatedCircularProgress
                    size={70}
                    width={5}
                    fill={70}
                    tintColor={appThemeColors.progressBarYellow}
                    rotation={220}
                    lineCap="round"
                    arcSweepAngle={280}
                    backgroundColor="grey"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: 18,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: '300',
                      }}>
                      810
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: appThemeColors.textColorGrey,
                        alignSelf: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.17,
                      }}>
                      cal
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#344760',
                paddingTop: 12,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  paddingTop: 7,
                }}>
                <Text style={{color: 'white'}}>Macronutrient Targets</Text>
                <Text style={{color: 'white'}}>^</Text>
              </View>

              <View style={{paddingBottom: 5, paddingTop: 16, borderWidth: 1}}>
                <View
                  style={{
                    paddingHorizontal: 18,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      Energy - 230.0 / 2100.0 kcal
                    </Text>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      11%
                    </Text>
                  </View>
                  <View style={{}}>
                    <Progress.Bar
                      progress={0.3}
                      width={380}
                      color={appThemeColors.progressBarWhite}
                      unfilledColor="#333333"
                      borderWidth={0}
                      height={10}
                    />
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 18,
                    paddingTop: 12,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      Protien - 20.0 / 150.0 kcal
                    </Text>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      12%
                    </Text>
                  </View>
                  <View style={{}}>
                    <Progress.Bar
                      progress={0.3}
                      width={380}
                      color={appThemeColors.progressBarBlue}
                      unfilledColor="#333333"
                      borderWidth={0}
                      height={10}
                    />
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 18,
                    paddingTop: 12,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      Protien - 20.0 / 150.0 kcal
                    </Text>
                    <Text
                      style={{
                        ...fontStyles.poppinsRegular12400,
                      }}>
                      100%
                    </Text>
                  </View>
                  <View style={{}}>
                    <Progress.Bar
                      progress={0.3}
                      height={10}
                      width={380}
                      color={appThemeColors.progressBarRed}
                      unfilledColor="#333333"
                      borderWidth={0}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 318, paddingVertical: 19}}>
                <GradientButton
                  onPress={() => {
                    addLog(logData.id);
                    handleCloseModalPress();
                  }}
                  colors={['#012D61', '#0158BF']}
                  title="Add to Diary "
                  style={{
                    padding: 15,
                    alignItems: 'center',
                    borderRadius: 16,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                  }}></GradientButton>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>

        {/* <View style={{flex: 1, justifyContent: 'center'}}>
       {FoodLogModal(modalVisible,setModalVisible)}
      </View> */}

        {/* Rest of the screen content */}
        {/* ... */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 49,
    paddingBottom: 15,
    paddingHorizontal: 53,
    color: 'white',
  },
  inputContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  data: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#344760',
    padding: 5,
    marginBottom: 7,
    marginRight: 24,
    width: 136,
    height: 34,
    color: 'white',
  },
  dropdown: {
    marginBottom: 10,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: appThemeColors.backgroundSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: appThemeColors.backgroundSecondary,
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
