import React from 'react'
import { ICar } from '../../types'
import './card.css'

interface ICardProps {
  car: ICar
  showMore: () => void
}

interface ICardState {
  featuresExpanded: boolean
}

export default class CardComponent extends React.Component<ICardProps, ICardState> {
  protected car: ICar

  public state = {
    featuresExpanded: false
  }

  protected maxFeatures = 3

  constructor(props: ICardProps) {
    super(props)

    this.car = props.car
  }

  protected get formatedPrice() {
    // https://stackoverflow.com/questions/16637051/adding-space-between-numbers
    return `${this.car.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  protected get featuresElements() {
    const features = [...this.car.features].splice(0, this.maxFeatures)

    return features.map(feature => (
      <li key={feature} className="card__info__features__list__item">{feature}</li>
    ))
  }

  protected get showMoreElement() {
    const { length } = this.car.features
    const { maxFeatures } = this

    if (length <= maxFeatures) {
      return null
    }

    const textForms = ['особенность', 'особенности', 'особенностей']
    let rightForm = textForms[2]

    const remaining = length - maxFeatures;
    const n = remaining % 100;
    const n1 = remaining % 10;

    if (n > 10 && n < 20) {
      rightForm = textForms[2]
    } else if (n1 > 1 && n1 < 5) {
      rightForm = textForms[1]
    } else if (n1 === 1) {
      rightForm = textForms[0]
    }

    return (
      <div className="card__info__features__show-more" onClick={this.expandFeatures.bind(this)}>
        еще {this.car.features.length - 3} {rightForm}
      </div>
    )
  }

  protected expandFeatures() {
    this.props.showMore()
  }

  render() {
    const { car } = this
    const { dealer } = car

    const geoText = [
      dealer.address,
      dealer.city,
      `${Math.floor(car.distance)} км`
    ].filter(Boolean).join(', ')

    const getTextElement = dealer.url
      ? <a className="card__geo__text" target="_blank" href={dealer.url!}>{geoText}</a>
      : <div className="card__geo__text">{geoText}</div>

    return (
      <div className="card">
        <div className="card__info">
          <div className="card__info__image">
            <img src={car.images[0]} alt={car.model_name} />
          </div>
          <div className="card__info__name">
            {car.model_name} { car.kit_name }
          </div>
          <div className="card__info__price">
            {this.formatedPrice}
          </div>
          <div className="card__info__features">
            <div className="card__info__features__title">Особенности:</div>
            <ul className="card__info__features__list">
              {this.featuresElements}
            </ul>
            {this.showMoreElement}
          </div>
        </div>
        <div className="card__geo">
          <img src="/images/pin.svg" className="card__geo__icon" />
          {getTextElement}
        </div>
      </div>
    )
  }
}