import { createContext, useContext } from 'react'
import { stores } from './index'

const StoreContext = createContext(stores)

export const useStores = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStores must be used within a StoreProvider')
  }
  return store
}
