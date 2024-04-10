import { StyleSheet, Text, View ,FlatList, Alert, TouchableOpacity  } from 'react-native'
import React from 'react'
import { appThemeColors } from '../utils/theme'

const SearchListView = (searchQuery,filteredFood ,displayData,handlePresentModalPress) => {
  return (
    <FlatList
    data={
      searchQuery ? filteredFood : displayData
    }
    renderItem={({item}) => (
      <TouchableOpacity
        style={{
          backgroundColor: appThemeColors.backgroundSecondary,
          borderBottomWidth: 2,
          height: 50,
          borderBottomColor: '#494848',
          height: 84,
        }}
        onPress={() => {
          handlePresentModalPress(item.id);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: appThemeColors.backgroundSecondary,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 3,
              paddingLeft: 20,
              paddingTop: 16,
              paddingBottom:8,
              flexWrap: 'wrap',
              
            }}>

            <View style={{justifyContent:'flex-end'}}>
              <Text
                style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                {item.name? item.name:item.shortFoodDescription}
              </Text>
            </View>


      
            <View style={{}}>
              <Text style={{color: 'white' ,fontSize:12,fontWeight:400}}>{item.id}</Text>
            </View>


          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}></View>
          </View>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item => item.id} // Assuming each food item has a unique ID
  />
  )
}

export default SearchListView

const styles = StyleSheet.create({})