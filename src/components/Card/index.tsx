import React from 'react'
import { ICar } from '../../types'
import './card.css'

interface ICardProps {
  car: ICar
}

export default class CardComponent extends React.Component<ICardProps>{

  render() {
    const { car } = this.props

    return (
      <div className="card">
        <div className="card__info">
          <div className="card__info__image">
            <img src={car.images[0]} alt={car.model_name} />
          </div>
          <div className="card__info__name">
            {car.model_name}
          </div>
          <div className="card__info__price">
            {car.price} ₽
          </div>
        </div>
      </div>
    )
  }
}