import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import './css/index.css';
import Catalog from './components/Catalog'
import Sorting from './components/Sorting'
import { fetchCars, ActionTypes } from './store/cars/actions';
import { RootState } from './store';

interface IConnectedDispatch {
  fetchCars: () => void
}

class App extends React.Component<IConnectedDispatch> {
  componentDidMount() {
    this.props.fetchCars()
  }

  render() {
    return (
      <div className="App">
        <div className="">
          <Sorting />
          <Catalog />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, ActionTypes>): IConnectedDispatch => {
  return {
    fetchCars: async () => {
      await dispatch(fetchCars())
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)