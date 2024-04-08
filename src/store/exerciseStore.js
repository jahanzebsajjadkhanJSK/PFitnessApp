import { observable, action, makeAutoObservable } from 'mobx'
import { apiCaller } from '../services/apiCaller'

export class ExerciseStore {
  @observable accessor exerciseList = {};
  @observable accessor exerciseGroups = {};
  @observable accessor exerciseLogs = {};
  @observable accessor customExercises = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.exerciseList = {};
    this.exerciseGroups = {};
    this.exerciseLogs = {};
    this.customExercises = {};
  }

  @action
  async getAllExercises(token) {
    try {
      const resp = await apiCaller(token).get('/exercise/all');
      this.customExercises = resp.data.customExerciseList
      this.exerciseGroups = resp.data.exerciseGroups
      this.exerciseList = resp.data.exerciseList
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async getExerciseGroups(token) {
    try {
      const resp = await apiCaller(token).get('/exercise/group/all');
      this.exerciseGroups = resp.data.exerciseGroups
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async addExerciseGroup(token, group) {
    try {
      const resp = await apiCaller(token).post('/exercise/group/add', group);
      if(resp.status === 200){
        this.getExerciseGroups(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async updateExerciseGroup(token, groupId, group) {
    try {
      const resp = await apiCaller(token).put(`/exercise/group/${groupId}`, group);
      if(resp.status === 200){
        this.getExerciseGroups(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async deleteExerciseGroup(token, groupId) {
    try {
      const resp = await apiCaller(token).delete(`/exercise/group/${groupId}`);
      if(resp.status === 200){
        this.getExerciseGroups(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async getExerciseLogs(token) {
    try {
      // TODO: Implement API call to get exercise logs
      // const resp = await apiCaller(token).get('/exercise/logs');
      // console.log('Exercise logs:', resp.data);
      // this.exerciseLogs = resp.data;
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async addExerciseLog(token, name, timeTaken, exerciseLogGroup) {
    try {
      const resp = await apiCaller(token).post('/exercise/log/add',
        { name, timeTaken, exerciseLogGroup }
      );
      if (resp.status === 200) {
        this.getExerciseLogs(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async updateExerciseLog(token, logId, name, exerciseLogGroup) {
    try {
      const resp = await apiCaller(token).put(`/exercise/group/${logId}`, 
        { name, exerciseLogGroup }
      );
      if(resp.status === 200){
        this.getExerciseLogs(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async deleteExerciseLog(token, logId) {
    try {
      const resp = await apiCaller(token).delete(`/exercise/log/${logId}`);
      if(resp.status === 200){
        this.getExerciseLogs(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async getCustomExercises(token) {
    try {
      const resp = await apiCaller(token).get('/exercise/custom/all');
      this.customExercises = resp.data.customExerciseList
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async addCustomExercise(
    token,
    name,
    force,
    level,
    mechanic,
    equipment,
    primaryMuscles,
    secondaryMuscles,
    category,
    metricType
  ) {
    try {
      const resp = await apiCaller(token).post(
        '/exercise/custom/add',
        {
          name,
          force,
          level,
          mechanic,
          equipment,
          primaryMuscles,
          secondaryMuscles,
          category,
          metricType
        }
      );
      if (resp.status === 200) {
        this.getCustomExercises(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async updateCustomExercise(
    token,
    id,
    name,
    force,
    level,
    mechanic,
    equipment,
    primaryMuscles,
    secondaryMuscles,
    category,
    metricType
  ) {
    try {
      const resp = await apiCaller(token).put(`/exercise/custom/${id}`,
        {
          name,
          force,
          level,
          mechanic,
          equipment,
          primaryMuscles,
          secondaryMuscles,
          category,
          metricType
        }
      );
      if (resp.status === 200) {
        this.getCustomExercises(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }

  @action
  async deleteCustomExercise(token, id) {
    try {
      const resp = await apiCaller(token).delete(`/exercise/custom/${id}`);
      if(resp.status === 200){
        this.getCustomExercises(token);
      }
    } catch (error) {
      console.log('store error', error);
      return [];
    }
  }
}
