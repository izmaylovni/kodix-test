import { ICar } from '../../types'

export type Sort = 'price' | 'distance';

export interface SortOption {
  key: Sort
  label: string
}

export interface ICarsState {
  list: ICar[];
  sort: Sort
  sortOptions: SortOption[]
}