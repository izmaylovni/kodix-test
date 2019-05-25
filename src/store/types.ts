import { ICar } from '../types'

export type Sort = 'price' | 'distance';

export interface IState {
  cars: ICar[];
  sort: Sort
}