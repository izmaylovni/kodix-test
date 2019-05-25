import React from 'react';
import { connect } from 'react-redux'
import { ICar } from '../types'
import CardComponent from '../components/Card'
import { ICarsState } from '../store/cars/types';
import { RootState } from '../store';

interface ICatalogProps {
  cars: ICar[]
}

class CatalogComponent extends React.Component<ICatalogProps> {
  get cards() {
    return this.props.cars.map((car: ICar) => (
      <div key={car.id} className="col-md-3 col-sm-6">
        <CardComponent car={car} />
      </div>
    ))
  }

  render() {
    return (
      <div className="row">
        {this.cards}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  cars: state.cars.list,
})

export default connect(
  mapStateToProps,
  null
)(CatalogComponent)