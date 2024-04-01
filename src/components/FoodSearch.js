import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {fdcApi} from '../services/NutritionApis/FDCapis/FdcApis';
const screenWidth = Dimensions.get('window').width;

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allFoodResults, setAllFoodResults] = useState([]);
  const [showList, setShowList] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleGetFoodList = async () => {
    setShowList(!showList);

    if (showList === true) {
      setLoading(true);
      try {
        const response = await fdcApi.getFoodList();
        console.log('Food List:', response.data);
        setAllFoodResults(response.data);
      } catch (error) {
        console.error('Error getting food list:', error);
      }
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fdcApi.searchFoodsUsingBody(
        searchQuery,
        'Foundation',
        25,
        1,
      );
      setSearchResults(response.data.foods);
    } catch (error) {
      console.error('Error searching foods:', error.response.data);
    }
    setLoading(false);
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: 'grey',
          borderWidth: 1,
          borderRadius: 15,
          width: screenWidth * 0.8,
        }}>
        <TextInput
          placeholder="Search food by name "
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {searchQuery && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.fdcId}
          renderItem={({item}) => <Text>{item.description}</Text>}
        />
      )}
      <View style={{marginTop: 20}}>
        <Button
          title={showList ? 'Hide Food list ' : 'Show Food List'}
          onPress={handleGetFoodList}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>

      {showList && (
        <FlatList
          data={allFoodResults}
          keyExtractor={item => item.fdcId}
          renderItem={({item}) => <Text>{item.description}</Text>}
        />
      )}
    </View>
  );
};

export default FoodSearch;
