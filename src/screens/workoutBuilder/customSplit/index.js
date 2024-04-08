import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'

import { useStores } from '../../../store/useStores'
import GradientButton from '../../../utils/GradientButton'
import { Container } from '../../workoutDiary/emptyContainer'
import { ProgressBar } from './progressBar'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

const CustomSplitScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    })
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    })
  }, [navigation])

  const { userStore, exerciseStore } = useStores()

  const [currentStep, setCurrentStep] = useState(1)
  const [enableNextButton, setEnableNextButton] = useState(false)
  const [name, setName] = useState('')
  const [hideTemplate, setHideTemplate] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState([])
  const [group, setActiveGroup] = useState({})

  useEffect(() => {
    const exerciseList = selectedExercises.map((id) =>
      exerciseStore.exerciseList.find((x) => x.id === id)
    )
    const draftGroup = { exerciseList, name }
    setActiveGroup(draftGroup)
  }, [selectedExercises.length, name])

  const handleSetName = (text) => {
    setName(text)
    if (text.length > 0) {
      setEnableNextButton(true)
    } else {
      setEnableNextButton(false)
    }
  }

  const handleEnableButton = (enable) => {
    setEnableNextButton(enable)
  }

  const handleNext = async () => {
    if (currentStep === 4) {
      // TODO: verify the flow
      await exerciseStore.addExerciseGroup(userStore.token, { name, exerciseList: selectedExercises })
      navigation.navigate('Workout Builder')
    }
    if (enableNextButton) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigation.navigate('Workout Builder')
    }
  }

  const getComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            setEnableNextButton={handleEnableButton}
            name={name}
            handleSetName={handleSetName}
          />)
      case 2:
        return (
          <Step2
            name={name}
            setEnableNextButton={handleEnableButton}
            setHideTemplate={setHideTemplate}
            hideTemplate={hideTemplate}
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            handleNext={handleNext}
          />
        )
      case 3:
        return (
          <Step3
            setEnableNextButton={handleEnableButton}
            group={group}
            handlePrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <Step4
            group={group}
            handlePrevious={handlePrevious}
          />)
      default:
        return (
          <Step1
            setEnableNextButton={handleEnableButton}
            name={name}
            handleSetName={handleSetName}
          />)
    }
  }

  return (
    <React.Fragment>
      {hideTemplate
        ? getComponent()
        : (
        <Container showOnlyBackButton goBack={handlePrevious}>
          {getComponent()}

          <View style={styles.footer}>
            <ProgressBar totalSteps={4} currentStep={currentStep} />
            <GradientButton
              title="Next"
              colors={
                enableNextButton ? ['#0779FF', '#044999'] : ['#656565', '#656565']
              }
              style={styles.nextBtn}
              onPress={handleNext}
            />
          </View>
        </Container>
          )}

    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24
  },
  nextBtn: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default observer(CustomSplitScreen)
