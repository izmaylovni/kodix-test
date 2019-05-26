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
      return {
        ...state,
        list: action.cars
      }

    case 'SET_SORT':
      return {
        ...state,
        sort: action.sort
      }

    case 'SORT_CARS':
      const { sort } = state;
      let cars = [...state.list]

      switch (sort) {
        case 'distance':
          cars = cars.sort((car1, car2) => car1.distance - car2.distance)
          break
        case 'price':
          cars = cars.sort((car1, car2) => car1.price - car2.price)
      }
      
      return {
        ...state,
        list: cars
      }
  }

  return state
}