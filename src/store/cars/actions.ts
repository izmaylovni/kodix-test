import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios';

import { Sort, ICarsState } from '../cars/types'
import { ICar, ICoordinates } from '../../types';

import { getDistance } from '../../helpers/geoposition'
import { RootState } from '..';

export const FETCH_CARS = 'FETCH_CARS'
export const SET_SORT = 'SET_SORT'
export const SET_CARS = 'SET_CARS'
export const SORT_CARS = 'SORT_CARS'

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

interface ISortCarsAction {
  type: typeof SORT_CARS;
}

export type ActionTypes = IFetchCarsAction | ISetSortAction | ISetCarsAction | ISortCarsAction;

export const setSort = (sort: Sort): ActionTypes => ({
  type: SET_SORT, sort: sort
})

export const setCars = (cars: ICar[]): ActionTypes => ({
  type: SET_CARS,
  cars
})

export const sortCars = (): ActionTypes => ({
  type: SORT_CARS,
})

export const changeSort = (sort: Sort): ThunkAction<void, RootState, {}, ActionTypes> => {
  return (dispatch: ThunkDispatch<RootState, {}, ActionTypes>, getState: () => RootState) => {
    console.log('sort:', sort);
    dispatch(setSort(sort))
    dispatch(sortCars())
  }
}

export const fetchCars = (): ThunkAction<Promise<void>, RootState, {}, ActionTypes> => {
  return (dispatch: ThunkDispatch<RootState, {}, ActionTypes>, getState: () => RootState): Promise<void> => {
    const { cars: carsState, geoposition: geoState } = getState()
    const { sort } = carsState
    const { currentPosition } = geoState

    const getCarDistance = (dealer: ICoordinates) => getDistance(
      currentPosition,
      dealer
    )

    const processCar = async (car: ICar) => {
      car.distance = await getCarDistance(car.dealer)
      console.log('car.distance :', car.distance )
    }

    return new Promise(async (resolve) => {
      const response = await axios.get('/cars.json')
      const cars: ICar[] = response.data

      setTimeout(() => {
        const { ymaps } = window

        ymaps.ready(async () => {
          const promises = cars.map(processCar)
          await Promise.all(promises);
          dispatch(setCars(cars))
          dispatch(sortCars())
          resolve()
        })

      }, 1000)
    })
  }
}