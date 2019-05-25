import React from 'react'
import { connect } from 'react-redux';
import { Sort, SortOption } from '../../store/cars/types'
import { changeSort, ActionTypes } from '../../store/cars/actions'
import { ThunkDispatch } from 'redux-thunk'

import './sorting.css'
import { RootState } from '../../store';

interface IConnectedState {
  sort: Sort
  sortOptions: SortOption[]
}

interface IConnectedDispatch {
  changeSort: (sort: Sort) => void
}

class SortingComponent extends React.Component<IConnectedState & IConnectedDispatch> {
  protected options: Sort[] = ['price', 'distance']

  protected changeSorting(sort: Sort) {
    this.props.changeSort(sort)
  }

  protected get optionsElements() {
    return this.props.sortOptions.map(({ key, label }) => {
      return (
        <div key={key} className="sorting__option">
          <input
            id={key}
            name="sorting"
            value="option"
            type="radio"
            checked={this.props.sort === key}
            onChange={() => this.changeSorting(key)}
          />
          <label htmlFor={key}>{label}</label>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="sorting">
        <div className="sorting__title">Сортировать</div>
        {this.optionsElements}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): IConnectedState => {
  return {
    sort: state.cars.sort,
    sortOptions: state.cars.sortOptions
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, ActionTypes>): IConnectedDispatch => ({
  changeSort: async (sort: Sort) => {
    await dispatch(changeSort(sort))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingComponent)