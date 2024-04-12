export const groupByExerciseName = (data) => {
  const groupedData = {}
  data.forEach((log) => {
    const exerciseName = log.exerciseList.id
    // console.log('exerciseName', exerciseName);
    if (!groupedData[exerciseName]) {
      groupedData[exerciseName] = []
    }
    groupedData[exerciseName].push(log)
  })
  // console.log('groupedData', groupedData);
  return groupedData
}
