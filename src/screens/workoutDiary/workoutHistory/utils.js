import { getDateInISO } from '../../../utils'

const groupByExerciseID = (logs) => {
  const groupedData = {}
  logs.forEach((log) => {
    const exerciseId = log.exerciseList?.id
    if (!exerciseId) {
      return
    }
    if (!groupedData[exerciseId]) {
      groupedData[exerciseId] = {
        details: {},
        logs: []
      }
    }
    groupedData[exerciseId].details = log.exerciseList
    delete log.exerciseList
    groupedData[exerciseId].logs.push(log)
  })
  return groupedData
}

export const groupDataByCreatedAt = (data) => {
  const groupedData = {}
  data.forEach((item) => {
    const createdAtDate = getDateInISO(item.createdAt)
    if (!groupedData[createdAtDate]) {
      groupedData[createdAtDate] = []
    }
    groupedData[createdAtDate].push(item)
  })
  return groupedData
}

export const getUniqueExercises = (logGroup) => {
  const uniqueExercises = []
  Object.keys(logGroup).forEach((groupId) => {
    const logsByExerciseObj = logGroup[groupId].logsByExercise
    Object.keys(logsByExerciseObj).forEach((exerciseId) => {
      const exercise = logsByExerciseObj[exerciseId].details
      const logs = logsByExerciseObj[exerciseId].logs

      const name = exercise.name
      const primaryMuscles = exercise.primaryMuscles

      uniqueExercises.push({
        id: groupId,
        logs,
        name,
        primaryMuscles
      })
    })
  })

  return uniqueExercises
}

export const groupLogs = (logGroups) => {
  const arr = {}
  logGroups.forEach((x) => {
    const res = groupByExerciseID(x.exerciseLogs)
    const newLogGroup = {
      logGroupId: x.id,
      logsByExercise: res
    }
    arr[x.id] = newLogGroup
  })
  const uniqueExercises = getUniqueExercises(arr)
  return uniqueExercises
}
