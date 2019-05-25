import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Sort, IState } from './types'
import { ICar } from '../types';
import cars from '../cars';
import axios from 'axios';

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

export const setCars = (cars: ICar[]): ActionTypes => {
  return {
    type: SET_CARS,
    cars
  }
}

export const fetchCars = (): ThunkAction<Promise<void>, IState, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<IState, {}, AnyAction>, getState: () => IState): Promise<void> => {
    const { data } = await axios.get('/cars.json')
    
    setTimeout(() => {
      dispatch(setCars(data))
    }, 1000)
  }
}