import { ICarsState } from '../cars/types';
import { ActionTypes } from './actions'

const initialState: ICarsState = {
  list: [],
  sort: 'price',
  sortOptions: [
    {
      key: 'price',
      label: 'По цене'
    },
    {
      key: 'distance',
      label: 'По удаленности'
    },
  ]
}

export default (state: ICarsState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_CARS':
      const { cars } = action;
    
      return {
        ...state,
        list: cars
      }
    case 'SET_SORT':
      return {
        ...state,
        sort: action.sort
      }
  }

  return state
}