import React from 'react'
import { ICar } from '../types'
import './card.css'

interface ICardProps {
  car: ICar
}

export default class CardComponent extends React.Component<ICardProps>{

  constructor(props: ICardProps) {
    super(props)
  }

  render() {
    const { car } = this.props
    return (
      <div className="card">
        {car.model_name}
      </div>
    )
  }
}