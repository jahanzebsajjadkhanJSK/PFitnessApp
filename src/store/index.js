import { create } from 'mobx-persist'
import { makeAutoObservable } from 'mobx'

import { UserStore } from './userStore'
import { NutritionStore } from './nutritionStore'

export class RootStore {
  constructor () {
    this.userStore = new UserStore(this)
    this.nutritionStore = new NutritionStore(this)
    // makeAutoObservable(this)
    // hydrate('userStore', this.userStore)
  }
}

// const hydrate = create({
//   storage: 'AsyncStorage',
//   jsonify: true,
//   debounce: 1000
// })

export const stores = new RootStore()
