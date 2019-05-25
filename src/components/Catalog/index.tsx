import React from 'react';
import { connect } from 'react-redux'
import { ICar } from '../../types'
import CardComponent from '../../components/Card'
import { IState } from '../../store/types';

interface ICatalogProps {
  cars: ICar[]
}

class CatalogComponent extends React.Component<ICatalogProps> {

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true
  }

  get cards() {
    console.log('get cards() this.props.cars', this.props);
    return this.props.cars.map((car: ICar) => (
      <div key={car.id} className="col-md-3 col-sm-6">
        <CardComponent car={car} />
      </div>
    ))
  }

  render() {
    console.log('render')
    return (
      <div className="row">
        {this.cards}
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  cars: state.cars,
})

export default connect(
  mapStateToProps,
  null
)(CatalogComponent)