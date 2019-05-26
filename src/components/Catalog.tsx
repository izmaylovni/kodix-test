import React from 'react';
import { connect } from 'react-redux'
import { ICar } from '../types'
import { ICarsState } from '../store/cars/types';
import { RootState } from '../store';

import CardComponent from '../components/Card'
import CarModal from '../components/FeaturesModal'

interface ICatalogProps {
  cars: ICar[]
}

interface ICatalogState {
  openedCar: null | ICar
}

class CatalogComponent extends React.Component<ICatalogProps, ICatalogState> {

  public state: ICatalogState = {
    openedCar: null
  }

  get cards() {
    return this.props.cars.map((car: ICar) => (
      <div key={car.id} className="col">
        <CardComponent showMore={() => this.openCarModal(car)} car={car} />
      </div>
    ))
  }

  protected openCarModal(car: ICar) {
    this.setState({
      openedCar: car
    })
  }

  render() {
    const { cards } = this

    if(!cards.length){
      return (
        <div className="preloader">Загрузка...</div>
      )
    }

    const { openedCar } = this.state

    const modalOpened = !!openedCar
    const features = openedCar ? openedCar.features : []

    return (
      <div className="row">
        {cards}
        <CarModal isOpen={modalOpened} close={() => this.setState({ openedCar: null })} features={features} />
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