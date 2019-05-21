import React from 'react';
import './App.css';
import cars from './cars'
import { ICar } from './types'
import CardComponent from './components/Card'

const App: React.FC = () => {
  const cards = cars.map((car: ICar) => {
    console.log('car:', car);
    
    return <CardComponent key={car.id} car={car} />
  })

  return (
    <div className="App">
      {cards}
    </div>
  );
}

export default App;
