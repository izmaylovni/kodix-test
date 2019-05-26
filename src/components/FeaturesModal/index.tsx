import React from 'react'
import Modal from 'react-modal';

import './featuresModal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    width: '60%',
    'maxHeight': '90%'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

interface IFeaturesModalProps {
  features?: string[]
  isOpen: boolean
  close: () => void
}

export default class CarFeaturedModalComponent extends React.Component<IFeaturesModalProps> {

  protected closeModal() {
    this.props.close()
  }

  render() {
    if (!this.props.features) return

    const featuresElements = this.props.features.map(feature => (
      <li className="features-modal__list" key={feature}>
        {feature}
      </li>
    ))

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles}
      >

        <div className="features-modal">

          <div className="features-modal__title">
            Особенности:
          </div>

          <ul className="features-modal__list">
            {featuresElements}
          </ul>

        </div>
      </Modal>
    )
  }
}