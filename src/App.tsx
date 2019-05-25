import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import './css/index.css';
import Catalog from './components/Catalog'
import { fetchCars } from './store/actions';

interface ConnectedDispatch {
  fetchCars: () => void
}

class App extends React.Component<ConnectedDispatch> {
  componentDidMount() {
    console.log('this.props:', this.props);
    this.props.fetchCars()
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Catalog />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ConnectedDispatch => {
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