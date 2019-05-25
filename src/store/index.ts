import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { ICarsState } from './cars/types'
import cars from './cars/reducers'

import geoposition, { IGeoState } from './geoposition/reducers'

export interface RootState {
  cars: ICarsState
  geoposition: IGeoState
}

const combinedReducers = combineReducers<RootState>({
  cars,
  geoposition
})

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
)

export default store
