import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet } from 'react-native'

const InfoScreen = ({ navigation, activeExercise }) => {
  return (
    <SafeAreaView style={styles.infoContainer}>
      <View style={[styles.commonCard, styles.commonCardRow]}>
          <Text style={styles.commonCardKeyText}>Equipment</Text>
          <Text style={styles.commonCardValueText}>{activeExercise.equipment}</Text>
      </View>

      <View style={styles.commonCard}>
        <View style={styles.commonCardRow}>
          <Text style={styles.commonCardKeyText}>Type</Text>
          <Text style={styles.commonCardValueText}>{activeExercise.mechanic}</Text>
        </View>

        <View style={styles.commonCardRow}>
          <Text style={styles.commonCardKeyText}>Force</Text>
          <Text style={styles.commonCardValueText}>{activeExercise.force}</Text>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    backgroundColor: '#121A24'
  },
  commonCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#121A24',
    backgroundColor: '#1C242D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 14,
  },
  commonCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 21
  },
  commonCardKeyText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: -0.165,
  },
  commonCardValueText: {
    color: '#8E8E8E',
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165,
  }
})

export default InfoScreen
