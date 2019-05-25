import { IState } from './types';
import { ActionTypes } from './actions'

const initialState: IState = {
  cars: [],
  sort: 'price'
}

export const reducer = (state: IState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_CARS':
      console.log('state.cars:', state.cars)
      return {
        ...state,
        cars: action.cars
      }
    case 'SET_SORT':
      return {
        ...state,
        sort: action.sort
      }
  }

  return state
}