const metricKeys = {
  weight: {
    key: 'weight',
    header: 'Weight (kgs)'
  },
  reps: {
    key: 'reps',
    header: 'Reps'
  },
  distance: {
    key: 'distance',
    header: 'Distance'
  },
  duration: {
    key: 'duration',
    header: 'Duration'
  }
}

export const CategoryToMetricMap = {
  strength: {
    keys: [metricKeys.weight, metricKeys.reps],
    metricEnum: 'WeightReps'
  },
  stretching: {
    keys: [metricKeys.duration],
    metricEnum: 'Duration'
  },
  plyometrics: {
    keys: [metricKeys.reps],
    metricEnum: 'Reps'
  },
  strongman: {
    keys: [metricKeys.reps],
    metricEnum: 'Reps'
  },
  powerlifting: {
    keys: [metricKeys.weight, metricKeys.reps],
    metricEnum: 'WeightReps'
  },
  cardio: {
    keys: [metricKeys.distance, metricKeys.duration],
    metricEnum: 'DistanceDuration'
  },
  olympicWeightlifting: {
    keys: [metricKeys.weight, metricKeys.reps],
    metricEnum: 'WeightReps'
  }
}
