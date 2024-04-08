import { StyleSheet, View } from 'react-native'

export const ProgressBar = ({ totalSteps, currentStep }) => {
  const stepsArray = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {stepsArray.map((step, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep ? styles.completedStep : styles.incompleteStep,
            index === totalSteps - 1 && styles.lastStep,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  step: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5
  },
  completedStep: {
    backgroundColor: '#0779FF', // Color for completed steps
  },
  incompleteStep: {
    backgroundColor: '#D9D9D9', // Color for incomplete steps
  },
  lastStep: {
    marginRight: 0, // Remove margin for the last step
  },
})