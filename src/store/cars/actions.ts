import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios';

import { Sort, ICarsState } from '../cars/types'
import { ICar, ICoordinates } from '../../types';

import { getDistance } from '../../helpers/geoposition'
import { RootState } from '..';

export const FETCH_CARS = 'FETCH_CARS'
export const SET_SORT = 'SET_SORT'
export const SET_CARS = 'SET_CARS'

interface ISetSortAction {
  type: typeof SET_SORT;
  sort: Sort;
}

interface IFetchCarsAction {
  type: typeof FETCH_CARS;
}

interface ISetCarsAction {
  type: typeof SET_CARS;
  cars: ICar[]
}

export type ActionTypes = IFetchCarsAction | ISetSortAction | ISetCarsAction;

export const setSort = (sort: Sort): ActionTypes => ({
  type: SET_SORT, sort: sort
})

export const changeSort = (sort: Sort): ThunkAction<Promise<void>, RootState, {}, ActionTypes> => {
  return async (dispatch: ThunkDispatch<RootState, {}, ActionTypes>, getState: () => RootState) => {
    dispatch({
      type: SET_SORT,
      sort
    })

    dispatch({
      type: SET_CARS,
      cars: []
    })

    dispatch(fetchCars())
  }
}

export const setCars = (cars: ICar[]): ActionTypes => {
  return {
    type: SET_CARS,
    cars
  }
}

export const fetchCars = (): ThunkAction<Promise<void>, RootState, {}, ActionTypes> => {
  return async (dispatch: ThunkDispatch<RootState, {}, ActionTypes>, getState: () => RootState): Promise<void> => {
    const { cars: carsState, geoposition: geoState } = getState()
    const { sort } = carsState
    const { currentPosition } = geoState

    const getCarDistance = ({ longitude, latitude }: ICoordinates) => getDistance(
      currentPosition,
      {
        longitude,
        latitude,
      }
    )

    const response = await axios.get('/cars.json')
    const cars: ICar[] = response.data.map((car: ICar) => ({
      ...car,
      distance: getCarDistance(car.dealer)
    }))

    switch (sort) {
      case 'distance':
        cars.sort((car1, car2) => {
          return car1.distance - car2.distance
        })
        break
      case 'price':
        cars.sort((car1, car2) => car2.price - car1.price)
    }

    setTimeout(() => {
      dispatch(setCars(cars))
    }, 1000)
  }
}